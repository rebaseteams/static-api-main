/* eslint-disable no-throw-literal */
import { DocumentInput } from '../../../models/types/documents';
import { DocumentsInterface } from '../../../models/interfaces/documents';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  // private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  // eslint-disable-next-line class-methods-use-this
  sendHtmlTemplates(options: DocumentInput): string {
    // eslint-disable-next-line no-console
    const response = `<h2><span style="color: #fbeeb8;">Hey ${options.artistName},</span></h2>
    <h3>We <span style="color: #2dc26b;">liked</span> your profile on <span style="color: #f1c40f;">Cuttime.</span></h3>
    <p>We are planning to have a Concert at <strong><span style="color: #3598db;">London, Imperial Collge,</span></strong></p>
    <p>and want you to collaborate with us.</p>
    <p>we liked you because ${options.reason}</p>
    <p><strong>Regards Imperial College.</strong></p>`;
    return response;
  }
}
