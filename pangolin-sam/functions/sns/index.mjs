// Import the AWS SDK for JavaScript
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Create an SNS client and S3 Client
const sns = new SNSClient({ region: 'us-east-1'});
const s3 = new S3Client({ region: 'us-east-1'});

// Lambda handler function
export const handler = async (event, context) => {
    try {
        
        // This value is set on sam deploy
        const BUCKET_NAME = process.env.BUCKET_NAME_SNS;

        // Strip event to important information.
        const eventKey = event.detail.object.key;

        // Get a url from S3 to send in the message body.
        const url = await getSignedUrl(s3, new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: eventKey,
          }), { expiresIn: 3600 });

        // Form input object for SnS Publish Command
        const input = {
            TopicArn: process.env.ARCHIVEALERT_TOPIC_ARN,
            Message: 'The following suspicious report has been archived: ' + eventKey + '\n' + url
        };

        // Send off the message to the topic.
        const command = new PublishCommand(input);
        const response = await sns.send(command);
        
        // Return the response
        return response;
    } catch (error) {
        
        //Provide info in case of errors.
        console.error('Error publishing message:', error);
        return error;
    }

  
};