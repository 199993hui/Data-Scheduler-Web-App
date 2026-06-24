import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const DataTable = ({ table }) => {
  //should be memoized or stable
  const tableData = Object.entries(JSON.parse(table)).map(([key, value]) => {
    return {
      key,
      value,
    };
  });
  
  console.log(tableData);
  const columns = useMemo(
    () => [
      {
        accessorKey: "key",
        header: "Feature",
        size: 150,
      },
      {
        accessorKey: "value",
        header: "Correlation",
        size: 150,
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={tableData} />;
};

export default DataTable;
