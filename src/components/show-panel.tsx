import { Button, ShowBase, SimpleShowLayout } from "react-admin";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { MouseEventHandler, PropsWithChildren } from "react";
import { EditButton } from "./edit-button";
import { SimpleButton, SimpleButtonProps } from "./simple-button";

interface ShowPanelProps extends PropsWithChildren {
  resource: string;
  editable?: boolean;
  buttons?: Array<SimpleButtonProps>;
}

export const ShowPanel = ({
  resource,
  children,
  editable,
  buttons,
}: ShowPanelProps) => {
  const { organisation_id, id } = useParams();
  const resource_id = resource === "organisations" ? organisation_id : id;
  if (!resource_id) {
    return <div>MUST HAVE RESOURCE ID</div>;
  }

  return (
    <ShowBase resource={resource} id={resource_id}>
      <>
        <Grid container>
          <Grid item sm={9}>
            <SimpleShowLayout>{children}</SimpleShowLayout>
          </Grid>
          <Grid item sm={3} justifySelf="right">
            {editable !== false ? (
              <p>
                <EditButton resource={resource} id={resource_id} />
              </p>
            ) : null}
            {buttons && buttons.map((b) => <SimpleButton {...b} />)}
          </Grid>
        </Grid>
      </>
    </ShowBase>
  );
};
