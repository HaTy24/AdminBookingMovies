import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import BaseUrl from "../../api/BaseURL";
import Axios from "axios";
import "../../Scss/input.scss";

function Ticket() {
  const [value, setValue] = useState([]);
  const [input, setInput] = useState("");

  const [reload, setReload] = useState(); //load lai trang
  const [totalPrice, setTotalPrice] = useState(0);
  // const [reload, setReload] = useState();
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Ve")
      .then((response) => response.json())
      .then((data) => setValue(data));
  }, [reload]);
  // const handleGet = () => {
  //   setReload(Math.random());
  // };
  const handleSearch = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const priceArr = value.filter((e) => {
      if (input === "") {
        return e;
      } else if (
        e.idChiTietChieuNavigation.idPhimNavigation.tenPhim
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        return e;
      }
    });
    const total = priceArr.reduce((acc, cur) => {
      return acc + cur.idChiTietChieuNavigation.giaVe;
    }, 0);
    setTotalPrice(total);
  });

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

  const handleDelete = (e, item) => {
    e.preventDefault();
    if (window.confirm(`Are you sure want to delete ???`)) {
      Axios.delete(BaseUrl.baseUrl + `/Ve/${item.idVe}`).then(() =>
        handleGet()
      );
    }
  };

  const handleGet = () => {
    setReload(Math.random());
  };

  return (
    <div>
      <div className="search">
        <input
          className="search-input"
          onChange={(e) => {
            handleSearch(e);
          }}
          placeholder="Search"
        ></input>
        <i className="fas fa-search"></i>
      </div>
      <h1 className="title">Doanh Thu Theo Phim</h1>
      <div className="print">
        <input
          className="form-input"
          disabled
          value={"Tổng Tiền: " + totalPrice + " VNĐ"}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1280 }} aria-label="customized table">
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
            <TableBody style={{ backgroundColor: "#dfdfdf" }}>
              {value
                .filter((val) => {
                  if (input === "") {
                    return val;
                  } else if (
                    val.idChiTietChieuNavigation.idPhimNavigation.tenPhim
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  ) {
                    return val;
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
                      <StyledTableCell>
                        <Button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                          }}
                          variant="outlined"
                          onClick={(e) => handleDelete(e, item)}
                        >
                          Xóa
                        </Button>
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

export default Ticket;
