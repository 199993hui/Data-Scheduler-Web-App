import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

function Checkboxes({ data, select_feature }) {
  const tableData = Object.entries(JSON.parse(data)).map(([key, value]) => {
    return {
      key,
      value,
    };
  });

  const storedState = JSON.parse(localStorage.getItem("clusterCheckbox"));
  const [state, setState] = useState(storedState || {});
  const [error, setError] = useState(true);

  useEffect(() => {
    setError(Object.values(state).filter((v) => v).length === 0);
    localStorage.setItem("clusterCheckbox", JSON.stringify(state));
  }, [state]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    select_feature({ ...state, [event.target.name]:event.target.checked })
    
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick One or More</FormLabel>
        <FormGroup>
          {tableData.map(({ key, value }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={state[key] || false}
                  onChange={handleChange}
                  name={key}
                />
              }
              label={`${key}`}
            />
          ))}
        </FormGroup>
        <FormHelperText error={error}>
          {error ? "Please select at least one checkbox" : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}

export default Checkboxes;
