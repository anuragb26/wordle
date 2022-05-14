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
          value="1"
          control={<Radio />}
          label="Easy (15 mins)"
          onChange={onSelect}
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Moderate (10 mins)"
          onChange={onSelect}
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Hard (5 mins)"
          onChange={onSelect}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Difficulty;
