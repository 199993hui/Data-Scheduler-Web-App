import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";

import Tables from "./Tables";
import DeleteForm from "./Delete";
import "./data.css";

function Data() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDate, setTableDate] = useState([]);

  const getDate = async () => {
    try {
      await fetch("http://127.0.0.1:5000/date", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRows(data);
          setTableDate(data);
          localStorage.setItem("date", JSON.stringify(data));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDate();
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async (date) => {
    let url;
    if (date !== "") {
      url = `http://127.0.0.1:5000/data?date=${date}`;
    } else {
      url = `http://127.0.0.1:5000/data`;
    }
    try {
      await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTableData(data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const hideOtherTab = (e) => {
    const target = e.target.getAttribute("data-target");
    getData(target.slice(1));
    let date = e.target.dataset.target;
    const collapses = document.querySelectorAll(".collapse");
    collapses.forEach((collapse) => {
      if (target !== collapse.getAttribute("data-target")) {
        collapse.classList.remove("show");
      }
    });
  };

  return (
    <>
      <Paper sx={{ margin: "10px auto", width: "75%", overflow: "hidden" }}>
        <div className="d-flex flex-column justify-content-center">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className="text-left">
                  <TableCell key="Date" style={{ minWidth: 10 }}>
                    Date
                  </TableCell>
                  <TableCell key="Date" style={{ minWidth: 10 }}>
                    Data
                  </TableCell>
                  <TableCell key="Date" style={{ minWidth: 10 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableDate.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No Available Data
                    </TableCell>
                  </TableRow>
                ) : (
                  tableDate
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((entries) => {
                      const column = Object.entries(entries);
                      const [date, order, output, product, schedule] = column;
                      console.log(date);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={date[0]}
                        >
                          <TableCell>
                            <Stack
                              sx={{ margin: "2px" }}
                              direction="row"
                              spacing={2}
                            >
                              {date[0]}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            Order ({order[1]}) Product ({product[1]}) Output (
                            {output[1]}) Schedule ({schedule[1]})
                          </TableCell>
                          <TableCell>
                            <Stack
                              sx={{ margin: "0px" }}
                              direction="row"
                              spacing={0}
                            >
                              <button
                                data-toggle="collapse"
                                data-target={`#${date[0]}`}
                                aria-expanded="true"
                                aria-controls={date[0]}
                                onClick={hideOtherTab}
                                class="btn btn-secondary"
                              >
                                view
                              </button>
                              <DeleteForm date={date[0]} />
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
            count={tableDate.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
      {tableDate.map((date, index) => {
        const [filtered_date] = Object.entries(date);

        return (
          <div class="collapse" id={filtered_date[0]}>
            {tableData.length !== 0 &&
              tableData.map((data) => <Tables tabledata={data} />)}
          </div>
        );
      })}
    </>
  );
}

export default Data;
