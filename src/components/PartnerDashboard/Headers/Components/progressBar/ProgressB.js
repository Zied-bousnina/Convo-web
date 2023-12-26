import React from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

export const ProgressB = () => {
  const step1Content = <h1>Mission created</h1>;
  const step2Content = <h1>in progress</h1>;
  const step3Content = <h1>Accepted</h1>;
  const step4Content = <h1>Completed</h1>;
  function step2Validator() {
    // return a boolean
    return true
  }

  function step3Validator() {
    // return a boolean
    return true
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  return (
    <StepProgressBar
      startingStep={0}
      onSubmit={onFormSubmit}
      label={"mission creation"}
      
      steps={[

        {
          label: "in progress",
          name: "in progress",
        //   content: step2Content,
          validator: step2Validator
        },
        {
          label: "Accepted",
          name: "Accepted",
        //   content: step3Content,
          validator: step3Validator
        },
        {
          label: "Completed",
          name: "Completed",
        //   content: step4Content,
          validator: step3Validator
        }
      ]}
    />
  );
};
