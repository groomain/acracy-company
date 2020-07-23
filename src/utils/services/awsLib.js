import { Storage } from "aws-amplify";
import { config } from '../../conf/amplify'

export async function s3Upload(filename, file) {

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
    bucket: config.s3.BUCKET_NAME,
  });
  return stored.key;
}

export async function s3Download(url) {
  let slicedURL = url.slice(5);
  let fileKey = slicedURL.slice(slicedURL.indexOf('/') + 8);
  const download = await Storage.get(fileKey, {
    bucket: config.s3.BUCKET_NAME
  });
  window.open(download, '_blank')
}
