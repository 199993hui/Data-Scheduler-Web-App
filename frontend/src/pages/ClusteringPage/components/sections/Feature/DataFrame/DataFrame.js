import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import DataTable from "./Table";

function SwitchLabel({ data }) {
  const [showTable, setShowTable] = React.useState(false);

  const handleSwitchChange = (event) => {
    setShowTable(event.target.checked);
  };

  const renderTable = () => {
    if (showTable) {
      return (
        <>
          <div style={{ width: "60rem", overflow: "scroll" }}>
            <DataTable table={data[3]} />;
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={showTable} onChange={handleSwitchChange} />}
          label="DataFrame"
        />
      </FormGroup>
      {renderTable()}
    </div>
  );
}

export default SwitchLabel