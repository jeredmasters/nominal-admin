import React, { Children, useEffect, useMemo, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Card } from "@mui/material";
import { BreadCrumbs, IBreadCrum } from "./breadcrumb";
import { useNavigate, useLocation } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  label: string;
  id?: string;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, ...other } = props;

  return <Box sx={{ p: 3 }}>{children}</Box>;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const getId = (element: any, fallback?: number | string) => {
  if (
    element &&
    typeof element === "object" &&
    "props" in element &&
    element.props.id
  ) {
    return element.props.id;
  }
  return fallback;
};
export interface TabContainerProps extends React.PropsWithChildren {
  label?: string;
  hashTabs?: boolean;
}
export const TabContainer = ({
  children,
  label,
  hashTabs,
}: TabContainerProps) => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabArray = useMemo(() => Children.toArray(children), [children]);

  const labels = useMemo(
    () => tabArray.map((c: any) => ("props" in c ? c.props.label : "")),
    [tabArray]
  );

  useEffect(() => {
    if (hashTabs) {
      const indexOrId = hash.replace("#", "");

      const index = tabArray.findIndex(
        (c: any) => "props" in c && c.props.id === indexOrId
      );
      if (index >= 0) {
        // attempt to match ID first
        setTabIndex(index);
      }
      if (Number(indexOrId).toString() === indexOrId) {
        setTabIndex(Number(indexOrId));
      }
    }
  }, [hash, hashTabs]);

  const child = useMemo(() => tabArray[tabIndex], [tabArray, tabIndex]);

  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    if (hashTabs) {
      const h = getId(tabArray[newIndex], newIndex);
      navigate("#" + h);
    } else {
      setTabIndex(newIndex);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {labels.map((l, i) => (
              <Tab key={i} label={l} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        {child}
      </Card>
    </Box>
  );
};
