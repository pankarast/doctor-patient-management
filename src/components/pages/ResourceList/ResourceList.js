import React, { useEffect, useState } from "react";
import NavigationBar from "../../Navigation/NavigationBar.js";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ResourceListService from "../../services/ResourceListService.js";
import Loader from "../../Loader/Loader.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "#35afaf",
    fontSize: 16,
    textTransform: "capitalize",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, bound, lastUsedParams) {
  return { name, bound, lastUsedParams };
}

function ResourceList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setErrorMessage] = useState(null);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [tableHeads, setTableHeads] = React.useState([]);
  const [tableContent, setTableContent] = React.useState([]);

  useEffect(() => {
    ResourceListService.getDashboard()
      .then((response) => {
        if (response.data.length) {
          // setTableHeads(Object.keys(response.data[0]));
          setTableHeads(["resourse name", "lastUsedParams"]);
          console.log(response.data);
          setTableContent(
            response.data.map((item, index) => {
              return createData(
                item.name,
                item.bound.low - item.bound.high,
                item.lastUsedParams
              );
            })
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <div>
      <NavigationBar Title="Resource List" />
      {/* <Container> */}
      <div className="dashChart">
        <div className="flexBox">
          <div className="chartBox">
            <div className="chartOptions">
              <div>
                <h2>Resources type:</h2>
              </div>
            </div>
            {loading ? (
              <Loader size="small" />
            ) : error ? (
              <div style={{textAlign: "center", color: "#f9543a"}}><h3 >{message}</h3><p>Please try again!</p></div>
            ) : (
              <TableContainer
                component={Paper}
                style={{borderRadius: '0px 0px 4px 4px'}}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {tableHeads.map((item, index) => {
                        <StyledTableCell key={index}>{item}</StyledTableCell>;
                        console.log(item);
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableContent.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        {/* <StyledTableCell>{row.bound}</StyledTableCell> */}
                        <StyledTableCell>{row.lastUsedParams}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}

export default ResourceList;
