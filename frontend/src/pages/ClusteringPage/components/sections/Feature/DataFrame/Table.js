import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const DataTable = ({ table }) => {
  const columns = useMemo(
    () =>
      Object.entries(table[0]).map(([key]) => {
        return {
          accessorKey: key,
          header: key,
        };
      }),
    []
  );

  return <MaterialReactTable columns={columns} data={table} />;
};

export default DataTable;
