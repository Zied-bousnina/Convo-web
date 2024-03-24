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

import { forwardRef } from "react";

// @mui material components
// Import statement for BoxProps remains unchanged as it's part of the MUI library, not specific to TypeScript

// Custom styles for MDBox
import MDBoxRoot from "components/MDBox/MDBoxRoot";

const MDBox = forwardRef(
  ({ variant = "contained", bgColor = "transparent", color = "dark", opacity = 1, borderRadius = "none", shadow = "none", coloredShadow = "none", ...rest }, ref) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

// Declaring default props for MDBox directly in the component, as defaultProps, is also valid JavaScript

export default MDBox;
