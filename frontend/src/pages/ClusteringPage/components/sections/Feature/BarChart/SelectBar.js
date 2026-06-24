import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./select.css";

function SelectBar({ data, select_bar }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    select_bar(value);
    setSelectedValue(value);
    localStorage.setItem("clusterFeatureBar", value);
  };

  useEffect(() => {
    const storedSelectedValue = localStorage.getItem("clusterFeatureBar");
    if (storedSelectedValue) {
      setSelectedValue(storedSelectedValue);
      select_bar(storedSelectedValue);
    }
  }, []);

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Categorical Features
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="numerical"
            value={selectedValue}
            onChange={handleChange}
            sx={{ width: "250px" }}
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
          <FormHelperText>Categorical Features</FormHelperText>
        </FormControl>
      </div>
    </>
  );
}

export default SelectBar;
