// Import the AWS SDK for JavaScript
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Create an SNS client
const sns = new SNSClient({ region: 'us-east-1'});
const s3 = new S3Client({ region: 'us-east-1'});

// Lambda handler function
export const handler = async (event, context) => {
    try {
        // Publish a message to the specified SNS topic

        const BUCKET_NAME = process.env.BUCKET_NAME_SNS;
        const eventKey = event.detail.object.key;

        const url = await getSignedUrl(s3, new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: eventKey,
          }), { expiresIn: 3600 });

        const input = {
            TopicArn: process.env.ARCHIVEALERT_TOPIC_ARN,
            Message: 'The following suspicious report has been archived: ' + eventKey + '\n' + url
        };

        
        const command = new PublishCommand(input);
        const response = await sns.send(command);
        // Return the response
        return response;
    } catch (error) {
        console.error('Error publishing message:', error);
        throw error;
    }

  
};