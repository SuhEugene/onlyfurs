import { S3mini } from 's3mini';

let s3Client: S3mini;
export const useS3Mini = () => {
  if (s3Client) return s3Client;

  const {
    s3: { accessKeyId, secretAccessKey, endpoint, region },
  } = useRuntimeConfig();

  if (!accessKeyId || accessKeyId === 'placeholder')
    throw new Error('Missing s3.accessKeyId runtime configuration');

  if (!secretAccessKey || secretAccessKey === 'placeholder')
    throw new Error('Missing s3.secretAccessKey runtime configuration');

  if (!endpoint || endpoint === 'placeholder')
    throw new Error('Missing s3.endpoint runtime configuration');

  if (!region || region === 'placeholder')
    throw new Error('Missing s3.region runtime configuration');

  s3Client = new S3mini({
    accessKeyId,
    secretAccessKey,
    endpoint,
    region,
  });

  return s3Client;
};
