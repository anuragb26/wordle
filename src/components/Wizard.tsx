import React, { useState, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import { Typography } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const steps = [
  {
    heading: "Select Grid Size",
    component: (props: any) => <GridSize {...props} />,
  },
  {
    heading: "Select Category",
    component: (props: any) => <Category {...props} />,
  },
  {
    heading: "Select Difficulty",
    component: (props: any) => <Timer {...props} />,
  },
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
  <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
    <Box>
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
    <Box>
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
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="5"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel value="5" control={<Radio />} label="5" />
            <FormControlLabel value="6" control={<Radio />} label="6" />
            <FormControlLabel value="7" control={<Radio />} label="7" />
            <FormControlLabel value="8" control={<Radio />} label="8" />
          </RadioGroup>
        </FormControl>
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

export const Wizard = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  // const [activeStep, setActiveStep] = useState<number>(0);
  return <>{steps[activeStep].component({ setActiveStep })}</>;
};
