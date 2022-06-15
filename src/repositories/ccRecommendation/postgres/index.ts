/* eslint-disable no-console */
import * as AWS from 'aws-sdk';
import { Connection, Repository } from 'typeorm';
import PgArtistRecommendationEntity from '../../../models/entities/pg-artist-recommendation';
import { CCRecommendationInterface } from '../../../models/interfaces/ccRecommendation';

export default class CCRecommendationRepo implements CCRecommendationInterface {
    sns: AWS.SNS;

    sqs: AWS.SQS;

    private artistRecommendationRepository : Repository<PgArtistRecommendationEntity>;

    constructor(connection: Connection) {
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.aws_region,
      });
      this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
      this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
      this.artistRecommendationRepository = connection.getRepository(PgArtistRecommendationEntity);
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
    });

    updateRecommendationStatus = async (): Promise<{ success: boolean; }> => new Promise(() => {
      const queueURL = process.env.SQS_Recommendation_Processed_QUEUE_URL;
      const params = {
        AttributeNames: [
          'SentTimestamp',
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
          'All',
        ],
        QueueUrl: queueURL,
      };

      this.sqs.receiveMessage(params, async (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          const messages = data.Messages;
          if (messages) {
            const response = messages[0].Body;
            const body = JSON.parse(response);
            const msgStr = body.Message;
            const msg = JSON.parse(msgStr);
            const msg_id = msg.id;
            const msg_status = msg.status;

            const updatedRecommendation = {
              id: msg_id,
              status: msg_status,
            };

            const updated = await this.artistRecommendationRepository.save(updatedRecommendation);
            console.log('Updated id', updated.id);
            console.log('Updated status', updated.status);

            if (updated) {
              const deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle,
              };
              this.sqs.deleteMessage(deleteParams, (e, res) => {
                if (e) {
                  console.log('Delete Error', e);
                } else {
                  console.log('Message Deleted', res);
                }
              });
            }
          } else {
            console.log('Checking for messages');
          }
        }
      });
    })
}
