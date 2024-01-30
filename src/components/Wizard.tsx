import React, { useState, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const steps = [
  { heading: "Grid Size", component: (props: any) => <GridSize {...props} /> },
  { heading: "Category", component: (props: any) => <Category {...props} /> },
  { heading: "Timer", component: (props: any) => <Timer {...props} /> },
  { heading: "Play", component: (props: any) => <Play {...props} /> },
];

const NavigationButtons = ({
  setActiveStep,
  showNext = true,
  showPrevious = true,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  showNext?: boolean;
  showPrevious?: boolean;
}) => (
  <Box sx={{ display: "flex", width: "100%" }}>
    <Box sx={{ display: "flex", width: "15%" }}>
      {showPrevious && (
        <Button
          onClick={() => {
            setActiveStep((step) => step - 1);
          }}
        >
          Previous
        </Button>
      )}
    </Box>
    <Box sx={{ display: "flex", width: "15%" }}>
      {showNext && (
        <Button
          onClick={() => {
            setActiveStep((step) => step + 1);
          }}
        >
          Next
        </Button>
      )}
    </Box>
  </Box>
);

const GridSize = ({
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <Box>
        <Typography>Show radio buttons for grid size</Typography>
      </Box>
      <NavigationButtons setActiveStep={setActiveStep} showPrevious={false} />
    </>
  );
};
const Category = ({
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <Box>
        <Typography>Show Categories</Typography>
        <NavigationButtons setActiveStep={setActiveStep} />
      </Box>
    </>
  );
};
const Timer = ({
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <Box>
        <Typography>Show timer</Typography>
      </Box>
      <NavigationButtons setActiveStep={setActiveStep} />
    </>
  );
};
const Play = ({ setActiveStep }: { setActiveStep: () => void }) => {
  return (
    <Box>
      <Typography>Play</Typography>
      <NavigationButtons setActiveStep={setActiveStep} showNext={false} />
    </Box>
  );
};

export const Wizard = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  return <>{steps[activeStep].component({ setActiveStep })}</>;
};
