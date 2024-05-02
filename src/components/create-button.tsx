import * as React from "react";
import ContentAdd from "@mui/icons-material/Add";
import { Fab, useMediaQuery, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslate, useResourceContext } from "ra-core";
import { Link, To } from "react-router-dom";
import { useCreatePath } from "../util";
import { Button, ButtonProps, LocationDescriptor } from "react-admin";

/**
 * Opens the Create view of a given resource
 *
 * Renders as a regular button on desktop, and a Floating Action Button
 * on mobile.
 *
 * @example // basic usage
 * import { CreateButton } from 'react-admin';
 *
 * const CommentCreateButton = () => (
 *     <CreateButton label="Create comment" />
 * );
 */
const CreateButton = (props: CreateButtonProps) => {
  const {
    className,
    icon = defaultIcon,
    label = "ra.action.create",
    resource: resourceProp,
    scrollToTop = true,
    variant,
    to: locationDescriptor,
    state = {},
    ...rest
  } = props;

  const resource = useResourceContext(props);
  const createPath = useCreatePath(resource);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  // Duplicated behaviour of Button component (legacy use) which will be removed in v5.
  const linkParams = getLinkParams(locationDescriptor);

  return isSmall ? (
    <StyledFab
      component={Link}
      to={createPath}
      state={state}
      // @ts-ignore FabProps ships its own runtime palette `FabPropsColorOverrides` provoking an overlap error with `ButtonProps`
      color="primary"
      className={clsx(CreateButtonClasses.floating, className)}
      aria-label={label && translate(label)}
      {...rest}
      {...linkParams}
    >
      {icon}
    </StyledFab>
  ) : (
    <StyledButton
      component={Link}
      to={createPath}
      state={state}
      className={clsx(CreateButtonClasses.root, className)}
      label={label}
      variant={variant}
      {...(rest as any)}
      {...linkParams}
    >
      {icon}
    </StyledButton>
  );
};

const defaultIcon = <ContentAdd />;

interface Props {
  resource?: string;
  icon?: React.ReactElement;
  scrollToTop?: boolean;
  to?: LocationDescriptor | To;
}

export type CreateButtonProps = Props & Omit<ButtonProps<typeof Link>, "to">;

CreateButton.propTypes = {
  resource: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.string,
};

const PREFIX = "RaCreateButton";

export const CreateButtonClasses = {
  root: `${PREFIX}-root`,
  floating: `${PREFIX}-floating`,
};

const StyledFab = styled(Fab, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [`&.${CreateButtonClasses.floating}`]: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 60,
    left: "auto",
    position: "fixed",
    zIndex: 1000,
  },
})) as unknown as typeof Fab;

const StyledButton = styled(Button, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})({});

export default React.memo(CreateButton, (prevProps, nextProps) => {
  return (
    prevProps.resource === nextProps.resource &&
    prevProps.label === nextProps.label &&
    prevProps.translate === nextProps.translate &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.to === nextProps.to
    // TODO compare state isEqual(prevProps.state, nextProps.state)
  );
});

const getLinkParams = (locationDescriptor?: LocationDescriptor | string) => {
  // eslint-disable-next-line eqeqeq
  if (locationDescriptor == undefined) {
    return undefined;
  }

  if (typeof locationDescriptor === "string") {
    return { to: locationDescriptor };
  }

  const { redirect, replace, state, ...to } = locationDescriptor;
  return {
    to,
    redirect,
    replace,
    state,
  };
};
