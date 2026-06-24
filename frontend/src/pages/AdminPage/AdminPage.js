import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import jwtDecode from "jwt-decode";

import UpdateForm from "./UpdateForm";
import DeleteForm from "./Delete";
import AccessDeniedPage from "../ErrorPage/AccessDeny";

const columns = [
  { id: "employeeID", label: "Employee ID", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 200 },
  { id: "role", label: "Role", minWidth: 170 },
];

function AdminPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const decodedToken = jwtDecode(localStorage.getItem("token"))["sub"];
  const role = decodedToken["role"];

  useEffect(() => {
    async function getEmployee() {
      const data = await fetch("http://127.0.0.1:5000/emp");
      const row = await data.json();
      setRows(row);
    }
    getEmployee();
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addEmployee = () => {
    navigate("/main/addEmployee");
  };

  return (
    <>
      {role === "Root" ? (
        <Paper sx={{ margin: "10px auto", width: "75%", overflow: "hidden" }}>
          <Stack sx={{ margin: "12px" }} direction="row" spacing={2}>
            <Button variant="outlined" onClick={addEmployee}>
              Add Employee
            </Button>
          </Stack>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No Available Data
                    </TableCell>
                  </TableRow>
                ) : (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column, index) => {
                            const value = row[column.id];
                            console.log(row);
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell>
                            <Stack
                              sx={{ margin: "2px" }}
                              direction="row"
                              spacing={2}
                            >
                              <UpdateForm emp={row} />
                              <DeleteForm emp={row} />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <>
          <AccessDeniedPage />
        </>
      )}
    </>
  );
}

export default AdminPage;
