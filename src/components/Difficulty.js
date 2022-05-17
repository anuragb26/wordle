import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Difficulty = ({ onSelect }) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="30"
          control={<Radio />}
          label="Easy (30 mins)"
          onChange={onSelect}
        />
        <FormControlLabel
          value="20"
          control={<Radio />}
          label="Moderate (20 mins)"
          onChange={onSelect}
        />
        <FormControlLabel
          value="10"
          control={<Radio />}
          label="Difficult (10 mins)"
          onChange={onSelect}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Difficulty;
