/**
=========================================================
* Material Dashboard 2 PRO React - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// Material Dashboard 2 PRO React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React context
import { useMaterialUIController, setLayout } from "context";
import MDBox from "ui/components";

function PageLayout({ background = "default", children }) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </MDBox>
  );
}

export default PageLayout;
