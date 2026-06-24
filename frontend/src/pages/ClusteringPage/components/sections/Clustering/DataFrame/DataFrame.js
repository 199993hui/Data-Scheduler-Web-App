import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
          <div style={{ marginLeft: "200px", marginRight: "200px" }}>
            <DataTable table={data[2]} />;
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
          label="Features Correlation "
        />
      </FormGroup>
      {renderTable()}
    </div>
  );
}

export default SwitchLabel