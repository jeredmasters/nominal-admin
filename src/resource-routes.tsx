import { RESOURCE } from "./const/resources";

import { ShowOrganisationPage } from "./resources/organisations/show-organisation";
import { ListOrganisationsPage } from "./resources/organisations/list-organisations";
import { ShowElectionPage } from "./resources/elections/show-election";
import { ShowVoterPage } from "./resources/voters/show-voter";
import { EditVoter } from "./resources/voters/edit-voter";
import { CreateElectionPage } from "./resources/elections/create-election";
import { CreateBallot } from "./resources/ballots/create-ballot";
import { ShowBallotPage } from "./resources/ballots/show-ballot";
import { CreateCandidatePage } from "./resources/candidates/create-candidate";
import { ShowCandidatePage } from "./resources/candidates/show-candidate";
import { CreateVoter } from "./resources/voters/create-voter";
import { CreateOrganisation } from "./resources/organisations/create-organisation";
import { EditOrganisation } from "./resources/organisations/edit-organisation";
import { EditElectionPage } from "./resources/elections/edit-election";
import { ListElections } from "./resources/elections/list-elections";
import { ListVotersPage } from "./resources/voters/list-voter";
import { ListCandidates } from "./resources/candidates/list-candidates";
import { ListEmailBatchs } from "./resources/email-batches/list-email-batches";
import { ShowEmailBatchPage } from "./resources/email-batches/show-email-batch";
import { CreateEmailBatchPage } from "./resources/email-batches/create-email-batch";
import { EditEmailBatchPage } from "./resources/email-batches/edit-email-batch";
import { ShowEmailTokenPage } from "./resources/email-tokens/show-email-token";
import { ListEmailTokens } from "./resources/email-tokens/list-email-tokens";
import {
  CreateEmailToken,
  CreateEmailTokenPage,
} from "./resources/email-tokens/create-email-token";
import { EditBallotPage } from "./resources/ballots/edit-ballot";
import { EditCandidatePage } from "./resources/candidates/edit-candidate";
import { ListTickets, ListTicketsPage } from "./resources/tickets/list-ticket";
import { ShowTicketPage } from "./resources/tickets/show-ticket";
import { CreateTicket } from "./resources/tickets/create-ticket";
import { EditTicket } from "./resources/tickets/edit-ticket";

export interface ResourceRoute {
  resource: RESOURCE;
  basePath?: string;
  idName: string;
  labelSingular?: string;
  labelMultiple?: string;
  children?: Array<ResourceRoute>;
  list?: JSX.Element | Array<ResourceTab>;
  show?: JSX.Element;
  edit?: JSX.Element;
  create?: JSX.Element;
  representation?: (raw: any) => string;
}

interface ResourceTab {
  title: string;
  component: JSX.Element;
}

export const ORG_ROUTES: ResourceRoute = {
  resource: RESOURCE.organisation,
  idName: "organisation_id",
  list: <ListOrganisationsPage />,
  show: <ShowOrganisationPage />,
  edit: <EditOrganisation />,
  create: <CreateOrganisation />,
  children: [
    {
      resource: RESOURCE.election,
      idName: "election_id",
      list: <ListElections />,
      show: <ShowElectionPage />,
      edit: <EditElectionPage />,
      create: <CreateElectionPage />,
      children: [
        {
          resource: RESOURCE.voter,
          idName: "voter_id",
          representation: (raw) => `${raw.first_name} ${raw.last_name}`,
          list: <ListVotersPage />,
          show: <ShowVoterPage />,
          edit: <EditVoter />,
          create: <CreateVoter />,
          children: [
            {
              resource: RESOURCE.email_token,
              idName: "email_token_id",
              list: <ListEmailTokens />,
              show: <ShowEmailTokenPage />,
              create: <CreateEmailTokenPage />,
            },
            {
              resource: RESOURCE.ticket,
              idName: "ticket_id",
              list: <ListTicketsPage />,
              show: <ShowTicketPage />,
              create: <CreateTicket />,
              edit: <EditTicket />,
            },
          ],
        },
        {
          resource: RESOURCE.ballot,
          idName: "ballot_id",
          list: <ListElections />,
          show: <ShowBallotPage />,
          create: <CreateBallot />,
          edit: <EditBallotPage />,
        },
        {
          resource: RESOURCE.candidate,
          idName: "candidate_id",
          representation: (raw) => `${raw.first_name} ${raw.last_name}`,
          list: <ListCandidates />,
          show: <ShowCandidatePage />,
          create: <CreateCandidatePage />,
          edit: <EditCandidatePage />,
        },
        {
          resource: RESOURCE.email_batch,
          idName: "email_batch_id",
          labelSingular: "Email Batch",
          list: <ListEmailBatchs />,
          show: <ShowEmailBatchPage />,
          create: <CreateEmailBatchPage />,
          edit: <EditEmailBatchPage />,
        },
      ],
    },
  ],
};
