import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { CheckCircleIcon, CheckIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";
export const CustomizedSteppers = ({status}) => {
  console.log(status) //in progress

  return (
    <>
<ProgressBar
        percent={
          status === "in progress"
            ? 50
            : status === "Accepted"
            ? 75
            : status === "Completed"
            ? 100
            : 0
        }
        filledBackground={`linear-gradient(to right, ${
          status === "in progress"
            ? "#fefb72"
            : status === "Accepted"
            ? "#01bf71"
            : status === "Completed"
            ? "#01bf71"
            : "#fefb72"
        }, ${
          status === "in progress"
            ? "#f0bb31"
            : status === "Accepted"
            ? "#01bf71"
            : status === "Completed"
            ? "#01bf71"
            : "#fefb72"
        })`}
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <EditIcon />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <CheckIcon />


          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <CheckCircleIcon />
          )}
        </Step>
      </ProgressBar>
    </>
  );
};
