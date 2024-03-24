/**
=========================================================
* Material Dashboard 2 PRO React - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples components

// import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";
import PageLayout from "views/examples/LayoutContainers/PageLayout";



function CoverLayout({ coverHeight = "35vh", image, children }) {
  return (
    <PageLayout>

      <MDBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: (theme) =>
            image &&
            `${theme.palette.background.gradient.linearGradient(
              theme.palette.background.gradient.dark.main(0.4),
              theme.palette.background.gradient.dark.state(0.4)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}

export default CoverLayout;
