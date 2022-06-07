/* eslint-disable no-console */
import * as AWS from 'aws-sdk';
import { CCRecommendationInterface } from '../../../models/interfaces/ccRecommendation';

export default class CCRecommendationRepo implements CCRecommendationInterface {
    sns: AWS.SNS;

    constructor() {
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.aws_region,
      });
      this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
    }

    generateRecommendation = async (id: string): Promise<{ success: boolean; }> => new Promise(() => {
      const params = {
        Message: JSON.stringify({ id }),
        TopicArn: process.env.TopicArn_SNS_Generate_Recommendation,
      };
      const publishTextPromise = this.sns.publish(params).promise();

      publishTextPromise.then(
        (data) => {
          console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
          console.log(`MessageID is ${data.MessageId}`);
        },
      ).catch(
        (err) => {
          console.error(err, err.stack);
        },
      );
    })
}
