import * as React from "react";
import { RESOURCE } from "../../const/resources";
import { SimpleCreate } from "../../components/simple-create";
import { TextInput } from "../../components/simple-form";
import { useGetOne } from "../../context/data.provider";
import { ErrorPanel } from "../../components/error";

interface CreateEmailTokenProps {
  voter_id: string;
}
export const CreateEmailToken = ({ voter_id }: CreateEmailTokenProps) => {
  if (!voter_id) {
    return <ErrorPanel text="Must have voter_id" source="CreateEmailToken" />;
  }

  const { data: voter } = useGetOne(RESOURCE.voter, voter_id);
  return (
    <SimpleCreate resource={RESOURCE.email_token}>
      <TextInput field="email" defaultValue={voter ? voter.email : null} />
    </SimpleCreate>
  );
};
