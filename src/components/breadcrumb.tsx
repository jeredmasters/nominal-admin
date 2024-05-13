import { Typography, Breadcrumbs } from "@mui/material";
import { useParams } from "react-router-dom";
import { useShowPath } from "../util";
import { Link } from "react-router-dom";
import { useGetOne } from "../context/data.provider";
import { useMemo } from "react";
import { RESOURCE } from "../const/resources";
import { getRepresentation } from "../util/resource";

export interface IBreadCrum {
  resource: RESOURCE;
  id: string;
}

interface BreadCrumbProps {
  resource: RESOURCE;
  label?: string;
  breadcrumbs?: Array<IBreadCrum>;
}

export const BreadCrumbs = ({ resource, label }: BreadCrumbProps) => {
  const { organisation_id, election_id, ballot_id, candidate_id, voter_id } =
    useParams();

  const breadcrumbs = useMemo(() => {
    const temp: IBreadCrum[] = [];
    if (organisation_id) {
      temp.push({ resource: RESOURCE.organisation, id: organisation_id });
    }
    if (election_id) {
      temp.push({ resource: RESOURCE.election, id: election_id });
    }
    if (candidate_id) {
      temp.push({ resource: RESOURCE.candidate, id: candidate_id });
    }
    if (ballot_id) {
      temp.push({ resource: RESOURCE.ballot, id: ballot_id });
    }
    if (voter_id) {
      temp.push({ resource: RESOURCE.voter, id: voter_id });
    }
    return temp;
  }, [organisation_id, election_id, ballot_id, candidate_id, voter_id]);

  return (
    <Breadcrumbs sx={{ marginTop: 2, marginBottom: 3 }} aria-label="breadcrumb">
      {breadcrumbs.map((b, i) => (
        <BreadCrum key={i} id={b.id} resource={b.resource} />
      ))}
    </Breadcrumbs>
  );
};

interface PageLabelProps {
  resource: RESOURCE;
  id: string;
}
const PageLabel = ({ resource, id }: PageLabelProps) => {
  const data = useGetOne(resource, id);
  if (!data) {
    return (
      <Typography fontSize={20} sx={{ color: "#33C" }}>
        Loading
      </Typography>
    );
  }
  const label = getRepresentation(resource, data);

  return <Typography fontSize={20}>{label}</Typography>;
};

const BreadCrum = ({ resource, id }: IBreadCrum) => {
  const data = useGetOne(resource, id);
  const showPath = useShowPath(resource);
  if (!data) {
    return (
      <Typography fontSize={20} sx={{ color: "#33C" }}>
        Loading
      </Typography>
    );
  }
  const label = getRepresentation(resource, data);

  return (
    <Link color="inherit" to={showPath(id)}>
      <Typography fontSize={20} sx={{ color: "#33C" }}>
        {label}
      </Typography>
    </Link>
  );
};
