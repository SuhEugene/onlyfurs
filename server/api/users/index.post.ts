export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const userData = {
    handle: String(body?.find((el) => el.name === 'handle')?.data),
    username: String(body?.find((el) => el.name === 'username')?.data),
    description: String(body?.find((el) => el.name === 'description')?.data || ''),
    followers: Number(body?.find((el) => el.name === 'followers')?.data || 0),
    avatar: body?.find((el) => el.name === 'avatar'),
    banner: body?.find((el) => el.name === 'banner'),
  };

  if (!userData.handle) throw createError({ status: 400 });
  if (!userData.username) throw createError({ status: 400 });
  if (!userData.avatar) throw createError({ status: 400 });
  if (!userData.banner) throw createError({ status: 400 });

  const s3Client = useS3Mini();
  const db = useDrizzle();
  const error = await db
    .transaction(
      async (tx) => {
        const [user] = await tx
          .insert(tables.users)
          .values({
            handle: userData.handle,
            username: userData.username,
            description: userData.description,
            followers: userData.followers,
          })
          .returning({ id: tables.users.id });

        if (!user) return tx.rollback();

        const { avatar, banner } = userData;
        const avatarUploadP = s3Client.putAnyObject(`ava/${user.id}`, avatar!.data, avatar!.type);
        const bannerUploadP = s3Client.putAnyObject(`bnr/${user.id}`, banner!.data, banner!.type);
        await Promise.allSettled([avatarUploadP, bannerUploadP]);
        const avatarUpload = await avatarUploadP;
        const bannerUpload = await bannerUploadP;

        async function rollbackFiles() {
          await Promise.allSettled([
            s3Client.deleteObject(`ava/${user!.id}`),
            s3Client.deleteObject(`bnr/${user!.id}`),
          ]);
          return tx.rollback();
        }

        if (!avatarUpload.ok) return rollbackFiles();
        if (!bannerUpload.ok) return rollbackFiles();

        await tx.transaction(async (tx) => {
          await tx.update(tables.users)
            .set({
              avatarURL: `ava/${user.id}`,
              bannerURL: `bnr/${user.id}`,
            })
            .where(eq(tables.users.id, user.id));
        }).catch((error) => {
          console.error(error);
          return rollbackFiles();
        });
      },
      { accessMode: 'read write' },
    )
    .catch((error) => {
      console.error(error);
      return error;
    });

  if (error) throw createError({ status: 500 });

  return userData.handle;
});
