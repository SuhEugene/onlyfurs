export default defineEventHandler(async (event) => {
  const rawHandle = getRouterParam(event, 'handle');
  if (!rawHandle) throw createError({ status: 400 });

  const body = await readMultipartFormData(event);
  const postData = {
    content: String(body?.find((el) => el.name === 'content')?.data),
    likes: Number(body?.find((el) => el.name === 'likes')?.data || 0),
    comments: Number(body?.find((el) => el.name === 'comments')?.data || 0),
    reposts: Number(body?.find((el) => el.name === 'reposts')?.data || 0),
    image: body?.find((el) => el.name === 'image'),
    imageCropped: Number(body?.find((el) => el.name === 'imageCropped')?.data || 0),
  };

  if (!postData.content) throw createError({ status: 400 });

  let postId: number | null = null;

  const s3Client = useS3Mini();
  const db = useDrizzle();
  const error = await db
    .transaction(
      async (tx) => {
        const [user] = await tx
          .select({ id: tables.users.id })
          .from(tables.users)
          .where(eq(tables.users.handle, rawHandle.toLowerCase()))
          .limit(1);

        if (!user) return tx.rollback();

        const [post] = await tx
          .insert(tables.posts)
          .values({
            content: postData.content,
            likes: postData.likes,
            comments: postData.comments,
            reposts: postData.reposts,
            isImageCropped: Boolean(postData.imageCropped),
            userId: user.id,
          })
          .returning({ id: tables.posts.id });

        if (!post) return tx.rollback();

        postId = post.id;

        const { image } = postData;
        if (image) {
          const imageUpload = await s3Client.putAnyObject(
            `sex/${post.id}`,
            image!.data,
            image!.type,
          );

          async function rollbackFile() {
            await s3Client.deleteObject(`ava/${user!.id}`).catch(() => {});
            return tx.rollback();
          }

          if (!imageUpload.ok) return rollbackFile();

          await tx
            .transaction(async (tx) => {
              await tx
                .update(tables.posts)
                .set({ imageURL: `sex/${post.id}` })
                .where(eq(tables.posts.id, post.id));
            })
            .catch((error) => {
              console.error(error);
              return rollbackFile();
            });
        }
      },
      { accessMode: 'read write' },
    )
    .catch((error) => {
      console.error(error);
      return error;
    });

  if (error) throw createError({ status: 500 });

  return postId;
});
