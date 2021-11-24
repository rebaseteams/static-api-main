/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-throw-literal */
import { DocumentInput } from '../../../models/types/documents';
import { DocumentsInterface } from '../../../models/interfaces/documents';

export default class InMemoryDocumentsRepo implements DocumentsInterface {
  // private artistRecommendationList : ArtistRecommendation[] = dummyArtistRecommendations;

  // eslint-disable-next-line class-methods-use-this
  sendHtmlTemplates(options: DocumentInput): string {
    // eslint-disable-next-line no-console
    const response = `<div class="page page-cover">
    <div>
    <h1><span style="color: #fbeeb8;">Collaboration Agreement Template</span></h1>
    </div>
    <div class="foot">
    <h3>Prepared for:<br /><br />${options.artistName}<br />Rebase​</h3>
    <h4>Created by:<br /><br />Praveen Prajapati<br />Cuttime​</h4>
    </div>
    </div>
    <div class="page page--level-down ">
    <p><strong>Collaboration Agreement</strong></p>
    <p><strong>Involved Parties</strong></p>
    <p>Party A:</p>
    <p>Party B:</p>
    <p>Purpose:</p>
    <p>Authority and Representation:</p>
    <p>Joint Decisions:</p>
    <p>Primary Representatives:</p>
    <p>Staffing:</p>
    <p>Funding:</p>
    <p>Profits and Proceeds:</p>
    <p>Additional Parties:</p>
    <p>Insurance:</p>
    <p>Termination:</p>
    <p>Agreement Extension:</p>
    <p><strong>Acceptance</strong></p>
    <p>​<span class="token">[PartyA.Company]</span>&nbsp;(Party A) and&nbsp;<span class="token">[PartyB.Company]</span>&nbsp;(Party B), collectively known as the &ldquo;Parties&rdquo;&nbsp;each desire to enter into a mutually beneficial business relationship. This collaboration agreement is intended to serve as a legally binding contract governing the terms of that relationship.</p>
    <h2 id="55207176-e892-4a5f-a1ea-975781580639"><strong>Involved Parties</strong></h2>
    <aside class="page tip">
    <p class="tip__text">Ensure that both parties&rsquo; names and contact details are listed in the template&rsquo;s contact tables below.</p>
    </aside>
    <h3 id="8535d108-cfd0-4d17-9eb3-cbfa8760762b"><strong>Party A</strong></h3>
    <figure class="wp-block-table">
    <table>
    <tbody>
    <tr>
    <td><span class="token">[PartyA.RepName]</span></td>
    <td><span class="token">[PartyA.Company]</span></td>
    </tr>
    <tr>
    <td>Name</td>
    <td>Company</td>
    </tr>
    <tr>
    <td><span class="token">[PartyA.Street]</span></td>
    <td><span class="token">[PartyA.Email]</span></td>
    </tr>
    <tr>
    <td>Street</td>
    <td>Email</td>
    </tr>
    <tr>
    <td><span class="token">[PartyA.City]</span>,&nbsp;<span class="token">[PartyA.State]</span><span class="token">[PartyA.Zip]</span></td>
    <td><span class="token">[PartyA.Phone]</span></td>
    </tr>
    <tr>
    <td>City, State, Zip</td>
    <td>Phone</td>
    </tr>
    </tbody>
    </table>
    </figure>
    </div>
    <div class="page page--level-down ">
    <h3 id="71af9157-b000-49f3-ba37-5c971092951b"><strong>Party B</strong></h3>
    <figure class="wp-block-table">
    <table>
    <tbody>
    <tr>
    <td><span class="token">[PartyB.RepName]</span></td>
    <td><span class="token">[PartyB.Company]</span></td>
    </tr>
    <tr>
    <td>Name</td>
    <td>Company</td>
    </tr>
    <tr>
    <td><span class="token">[PartyB.Street]</span></td>
    <td><span class="token">[PartyB.Email]</span></td>
    </tr>
    <tr>
    <td>Street</td>
    <td>Email</td>
    </tr>
    <tr>
    <td><span class="token">[PartyB.City]</span>,&nbsp;<span class="token">[PartyB.State]</span>&nbsp;<span class="token">[PartyB.Zip]</span></td>
    <td><span class="token">[PartyB.Phone]</span></td>
    </tr>
    <tr>
    <td>City, State, Zip</td>
    <td>Phone</td>
    </tr>
    </tbody>
    </table>
    </figure>
    <h3 id="9433fbf6-a4a3-48f9-ac6a-3377ad139177"><strong>Purpose</strong></h3>
    <aside class="page tip">
    <p class="tip__text">Use the text field in this section of the collaboration agreement template to detail the goals and objectives that the parties hope to accomplish together.</p>
    </aside>
    <p>The Parties wish to combine their resources to accomplish the following:</p>
    <h3 id="6cecd81b-889c-4f23-89b1-f99b1e4f228d"><strong>Authority and Representation</strong></h3>
    <aside class="page tip">
    <p class="tip__text">This section of the template outlines the process for making joint decisions and electing authorized representatives for collaborative projects.</p>
    </aside>
    <h4 id="14bb5139-3cb4-4a02-9654-b02e7a2de920"><strong>Joint Decisions</strong></h4>
    <p>Any and all &nbsp;significant decisions regarding this&nbsp;collaboration agreement&nbsp;require approval by all involved parties.</p>
    <p>Decisions will include, but not be limited too any and all&nbsp;decisions in regard to service&nbsp;eligibility, service nature, and any and all financial matters related to the above listed objectives.&nbsp;</p>
    </div>
    <div class="page page--level-down ">
    <h4 id="dd0e45dd-ec1b-4872-a558-d3125c3b8d23"><strong>Primary Representatives</strong></h4>
    <p>&nbsp;The Parties shall each nominate a primary representative to act on their behalf in all matters related to this collaboration agreement.</p>
    <p>Chosen primary representatives shall be vested with the full ability to make decisions on behalf of their respective employers.</p>
    <p>It is mutually understood that the Parties shall make every effort to ensure that all involved parties are fully aware of any pertinent facts related to the above listed objectives for the duration of this collaboration agreement.</p>
    <p>Chosen primary representatives shall be responsible for keeping their respective employers abreast of any developments related to this collaboration agreement.</p>
    <p>The following individuals have been appointed as chosen primary representatives for their respective employers:</p>
    <figure class="wp-block-table">
    <table>
    <thead>
    <tr>
    <th><strong>Name</strong></th>`;
    return response;
  }
}
