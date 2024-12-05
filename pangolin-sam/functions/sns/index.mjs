// Import the AWS SDK for JavaScript
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Create an SNS client
const sns = new SNSClient({ region: 'us-east-1'});

// Lambda handler function
export const handler = async (event, context) => {
    try {
        // Publish a message to the specified SNS topic
        const input = {
            TopicArn: process.env.ARCHIVEALERT_TOPIC_ARN,
            Message: 'The following suspicious report has been archived: ' + event.detail.object.key
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