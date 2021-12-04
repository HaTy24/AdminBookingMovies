import React, { useState, useEffect, useRef } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";

function Print() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // // hide last border
    // "&:last-child td, &:last-child th": {
    //   border: 0,
    // },
  }));

  const componentRef = useRef();

  return (
    <div>
      <TableContainer ref={componentRef} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Người Đặt</StyledTableCell>
              <StyledTableCell align="center">Tên Phim</StyledTableCell>
              <StyledTableCell align="center">Tên Rạp</StyledTableCell>
              <StyledTableCell align="center">Chổ Ngồi</StyledTableCell>
              <StyledTableCell align="center">Ngày Chiếu</StyledTableCell>
              <StyledTableCell align="center">Giờ Bắt Đầu</StyledTableCell>
              <StyledTableCell align="center">Giá Vé</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Print;
