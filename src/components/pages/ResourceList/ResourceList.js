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



function ResourceList() {
  

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
            
              <Loader size="small" />

          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}

export default ResourceList;
