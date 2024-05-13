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

export interface ResourceRoute {
  resource: RESOURCE;
  basePath?: string;
  idName: string;
  labelSingular?: string;
  labelMultiple?: string;
  children?: Array<ResourceRoute>;
  list?: JSX.Element;
  show?: JSX.Element;
  edit?: JSX.Element;
  create?: JSX.Element;
  representation?: (raw: any) => string;
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
        },
        {
          resource: RESOURCE.ballot,
          idName: "ballot_id",
          list: <ListElections />,
          show: <ShowBallotPage />,
          create: <CreateBallot />,
        },
        {
          resource: RESOURCE.candidate,
          idName: "candidate_id",
          representation: (raw) => `${raw.first_name} ${raw.last_name}`,
          list: <ListCandidates />,
          show: <ShowCandidatePage />,
          create: <CreateCandidatePage />,
        },
        {
          resource: RESOURCE.email_batch,
          idName: "email_batch_id",
          list: <ListEmailBatchs />,
          show: <ShowEmailBatchPage />,
          create: <CreateEmailBatchPage />,
        },
      ],
    },
  ],
};
