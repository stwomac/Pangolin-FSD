import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import



export const handler = async (event) => {
  // TODO implement

  const client = new S3Client({ region: 'us-east-1'});
  const obj = JSON.parse(event.body);
  const input = {
    'Body': JSON.stringify(obj),
    'Bucket': process.env.BUCKET_NAME,
    'Key' : obj.reportId + '.txt'

  };
  const command = new PutObjectCommand(input);

  const createOb = await client.send(command);
  
};
