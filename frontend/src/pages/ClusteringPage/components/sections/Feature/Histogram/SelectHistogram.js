import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./select.css";

function SelectHistogram({ data, select_hist }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    select_hist(value);
    setSelectedValue(value);
    localStorage.setItem("clusterFeatureHist", value);
  };

  useEffect(() => {
    const storedSelectedValue = localStorage.getItem("clusterFeatureHist");
    if (storedSelectedValue) {
      setSelectedValue(storedSelectedValue);
      select_hist(storedSelectedValue);
    }
  }, []);

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
            // value={numerical}
            label="numerical"
            value={selectedValue}
            onChange={handleChange}
            sx={{ width: "250px" }}
          >
            <MenuItem value="">
              None
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

export default SelectHistogram;
