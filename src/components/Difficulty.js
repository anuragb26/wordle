import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Difficulty = ({ onSelect }) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="easy"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="easy"
          control={<Radio />}
          label="Easy (15 mins)"
        />
        <FormControlLabel
          value="moderate"
          control={<Radio />}
          label="Moderate (10 mins)"
        />
        <FormControlLabel
          value="hard"
          control={<Radio />}
          label="Hard (5 mins)"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Difficulty;
