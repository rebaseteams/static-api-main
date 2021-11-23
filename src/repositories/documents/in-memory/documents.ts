/* eslint-disable no-throw-literal */
import { DocumentInput } from '../../../models/types/documents';
import { DocumentsInterface } from '../../../models/interfaces/documents';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  // private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  // eslint-disable-next-line class-methods-use-this
  sendHTMLtemplates(options: DocumentInput): string {
    // eslint-disable-next-line no-console
    const response = `<h4>Hey ${options.artistName}</h4><h6>We want to colaborate with you because ${options.reason}</h4>`;
    return response;
  }
}
