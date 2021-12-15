/* eslint-disable no-console */
import { AttachmentJSON } from '@sendgrid/helpers/classes/attachment';
import sgMail from '@sendgrid/mail';

const key = '';
const from = 'prasana.shinde.rebase@gmail.com';
sgMail.setApiKey(key);

const sendEmail = async (
  {
    to, subject, text, html, attachments,
  } :
  {
    to : string,
    subject : string,
    text? : string,
    html? : string,
    attachments? : AttachmentJSON[],
  } & ({text : string} | {html : string}),
) : Promise<{success : boolean}> => {
  const msg : sgMail.MailDataRequired = {
    to,
    from,
    subject,
    text,
    html,
    attachments,
  };
  await sgMail.send(msg);
  return { success: true };
};

export default sendEmail;
