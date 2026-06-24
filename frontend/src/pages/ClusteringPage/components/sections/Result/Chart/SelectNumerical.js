import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./select.css";

function SelectNumerical({ data, select_numerical, selectedNumerical }) {
  const handleChange = (event) => {
    select_numerical(event.target.value);
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Numerical Features
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedNumerical}
            label="numerical"
            onChange={handleChange}
            sx={{ width: "200px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.entries(data).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Numerical Features</FormHelperText>
        </FormControl>
      </div>
    </>
  );
}

export default SelectNumerical;
