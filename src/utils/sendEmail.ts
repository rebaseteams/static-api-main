import sgMail = require('@sendgrid/mail');
import handlebars = require('handlebars');

import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

const fs = require('fs');

// Code is extracted fron rebase util and some modifications are done
async function sendEmail(input: any) {
  const msg: MailDataRequired | any = {
    // extract the email details
    to: input.receiver.to,
    from: input.sender.email,
    cc: input.receiver.cc,
    // extract the custom fields
    dynamic_template_data: {
      ...input.content.values,
    },
  };
  switch (input.content.type) {
    case 'TEMPLATE':
      msg.template_id = input.content.templateId;
      break;
    case 'HTML':
      msg.subject = input.content.subject;
      // msg.html = fs.readFileSync(input.content.html, 'utf-8');
      msg.html = input.content.html;
      break;
    case 'DYNAMIC_HTML':
      // eslint-disable-next-line no-case-declarations
      const source = fs.readFileSync(input.content.dynamicHtml, 'utf-8');
      // eslint-disable-next-line no-case-declarations
      const template = handlebars.compile(source)(input.content.values);
      msg.subject = input.content.subject;
      msg.html = template;
      break;
    default:
      return 0;
  }
  switch (input.sender.vendor.name) {
    case 'SENDGRID':
      sgMail.setApiKey(String(process.env.SEND_GRID_API_KEY));
      try {
        const response = await sgMail.send(msg);
        return response;
      } catch (err) {
        return err;
      }
    default:
      return 'No vendor available';
  }
}

export default sendEmail;
