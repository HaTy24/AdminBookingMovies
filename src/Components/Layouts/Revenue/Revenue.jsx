import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BaseUrl from "../../api/BaseURL";
import ReactToPrint from "react-to-print";

function Revenue() {
  const [totalPrice, setTotalPrice] = useState();
  const [value, setValue] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Ve")
      .then((response) => response.json())
      .then((data) => setValue(data));
  }, []);

  useEffect(() => {
    const priceArr = value.filter((item) => {
      if (input === "") {
        return item;
      } else if (
        item.idChiTietChieuNavigation.ngayChieu.slice(0, 7).includes(input)
      ) {
        return item;
      }
    });
    const total = priceArr.reduce((acc, cur) => {
      return acc + cur.idChiTietChieuNavigation.giaVe;
    }, 0);
    setTotalPrice(total);
  });
  const handleMonth = (e) => {
    setInput(e.target.value);
  };

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
      <h1 className="title">Doanh Thu Theo Tháng</h1>
      <div className="form">
        <ReactToPrint
          trigger={() => (
            <button className="form-button">
              In Doanh Thu
              <i className="fas fa-print"></i>
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="print" ref={componentRef}>
        <label htmlFor="start" className="label">
          Choose Month
        </label>
        <div className="form-group">
          <input
            className="form-input"
            onChange={(e) => handleMonth(e)}
            type="month"
            id="start"
            name="start"
          ></input>
          <input
            className="form-input"
            disabled
            value={"Tổng Tiền: " + totalPrice + " VNĐ"}
          />
        </div>
        <TableContainer component={Paper}>
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
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#dfdfdf" }}>
              {value
                .filter((item) => {
                  if (input === "") {
                    return item;
                  } else if (
                    item.idChiTietChieuNavigation.ngayChieu
                      .slice(0, 7)
                      .includes(input)
                  ) {
                    return item;
                  }
                })
                .map((item, i) => {
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {item.idVe}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idUserNavigation.hoTen}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idChiTietChieuNavigation.idPhimNavigation.tenPhim}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {
                          item.idChiTietChieuNavigation.idPhongNavigation
                            .tenPhong
                        }
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idChoNgoiNavigation.idGheNavigation.tenGhe}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idChiTietChieuNavigation.ngayChieu.split("T")[0]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idChiTietChieuNavigation.gioBatDau
                          .split("T")[1]
                          .slice(0, 5)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.idChiTietChieuNavigation.giaVe + " VNĐ"}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Revenue;
