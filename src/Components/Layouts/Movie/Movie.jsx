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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Axios from "axios";
import { DialogContent, DialogTitle } from "@mui/material";
import BaseUrl from "../../api/BaseURL";
import "./Movie.scss";

function GetMovie() {
  // *** khai bao ***
  const [value, setValue] = useState([]); //luu phim
  const [input, setInput] = useState(""); //nhap vao tim kiem
  const [data, setData] = useState({
    idtl: "",
    tenphim: "",
    thoiLuong: "",
    image: "",
    hour: "",
    minutes: "",
    trailer: "",
    des: "",
  }); //gia tri put phim

  const [reload, setReload] = useState(); //load lai trang
  const [open, setOpen] = useState(false); //mo dialog
  const [dialog, setDialog] = useState({
    idtl: "",
    tenphim: "",
    thoiLuong: "",
    image: "",
    hour: "",
    minutes: "",
    trailer: "",
    des: "",
  }); //gia tri dialog
  const [result, setResult] = useState([]);
  // *** get the loai ***
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/TheLoai")
      .then((response) => response.json())
      .then((data) => setResult(data));
  }, []);
  // *** get phim ***
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Phim")
      .then((response) => response.json())
      .then((data) => setValue(data));
  }, [reload]);
  // *** reload ***
  const handleGet = () => {
    setReload(Math.random());
  };
  // *** put phim ***
  const handlePut = (e, idPhim) => {
    e.preventDefault();
    Axios.put(BaseUrl.baseUrl + `/Phim/${idPhim}`, {
      idTheLoai: parseInt(data.idtl),
      tenPhim: data.tenphim,
      thoiLuong: data.hour + "h" + data.minutes,
      image: data.image,
      trailer: data.trailer + "!!!" + data.des,
    })
      .then(setOpen(false))
      .then(console.log(data))
      .then(() => handleGet());
  };

  const arr = [];
  for (let i = 0; i <= 59; i++) {
    arr.push(i);
  }

  // *** delete phim ***
  const handleDelete = (e, item) => {
    e.preventDefault();
    if (window.confirm(`Are you sure want to delete: ${item.tenPhim}`)) {
      Axios.delete(BaseUrl.baseUrl + `/Phim/${item.idPhim}`).then(() =>
        handleGet()
      );
    }
  };

  // *** tim kiem ***
  const handleSearch = (e) => {
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleClickOpen = (item) => {
    setOpen(true);
    setDialog(item);
    // console.log(data);
    setData({
      idtl: item.idTheLoai,
      tenphim: item.tenPhim,
      hour: item.thoiLuong.split("h")[0],
      minutes: item.thoiLuong.split("h")[1].trim(),
      image: item.image,
      des: item.trailer.split("!!!")[1],
      trailer: item.trailer.split("!!!")[0],
    });
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePutChange = (e) => {
    let newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };
  return (
    <div className="movies">
      <div className="search">
        <input
          className="search-input"
          onInput={(e) => {
            handleSearch(e);
          }}
          placeholder="Search"
        ></input>
        <i className="fas fa-search"></i>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Thể Loại</StyledTableCell>
              <StyledTableCell align="center">Tên Phim</StyledTableCell>
              <StyledTableCell align="center">Thời Lượng</StyledTableCell>
              <StyledTableCell align="center">Hình Ảnh</StyledTableCell>
              <StyledTableCell align="center">Trailer</StyledTableCell>
              <StyledTableCell align="center">Mô tả</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value
              .filter((val) => {
                if (input === "") {
                  return val;
                } else if (
                  val.tenPhim.toLowerCase().includes(input.toLowerCase()) ||
                  val.idTheLoaiNavigation.tenTheLoai
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
                      {item.idPhim}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.idTheLoaiNavigation.tenTheLoai}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.tenPhim}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.thoiLuong}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <img src={item.image} alt="" />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {/* <iframe
                        width="200"
                        height="155"
                        src={`https://www.youtube.com/embed/${
                          item.trailer.split("!!!")[0]
                        }`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe> */}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.trailer.split("!!!")[1]}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{
                          backgroundColor: "#594AE2",
                          color: "white",
                          display: "block",
                        }}
                        variant="outlined"
                        onClick={(e) => handleClickOpen(item, i)}
                      >
                        Sửa
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginTop: "8px",
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "red", textTransform: "uppercase" }}>
          Chỉnh sửa thông tin phim
        </DialogTitle>
        <DialogContent>
          <label>Thể loại</label>
          <select
            defaultValue={dialog.idTheLoai}
            className="select"
            id="idtl"
            onChange={(e) => {
              handlePutChange(e);
            }}
          >
            {result.map((i) => {
              return (
                <option key={i.idPhim} value={i.idTheLoai}>
                  {i.tenTheLoai}
                </option>
              );
            })}
          </select>
          <TextField
            fullWidth
            variant="filled"
            label="Tên phim"
            id="tenphim"
            onChange={(e) => handlePutChange(e)}
            defaultValue={dialog.tenPhim}
          ></TextField>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <label>Thời lượng</label>
            <select
              defaultValue={dialog.thoiLuong.split("h")[0]}
              id="hour"
              style={{ padding: "5px 8px" }}
              onChange={(e) => handlePutChange(e)}
            >
              <option>1</option>;<option>2</option>;
            </select>
            <select
              defaultValue={dialog.thoiLuong.trim().split("h")[1]}
              id="minutes"
              style={{ padding: "5px 8px" }}
              onChange={(e) => handlePutChange(e)}
            >
              {arr.map((item, i) => {
                return <option key={i}>{item}</option>;
              })}
            </select>
          </div>
          <TextField
            label="Hình ảnh"
            fullWidth
            variant="filled"
            id="image"
            onChange={(e) => handlePutChange(e)}
            defaultValue={dialog.image}
          ></TextField>
          {/* <img src={img} alt="" /> */}
          <TextField
            label="Trailer"
            fullWidth
            variant="filled"
            id="trailer"
            onChange={(e) => handlePutChange(e)}
            defaultValue={dialog.trailer.split("!!!")[0]}
          ></TextField>
          <TextField
            label="Mô tả"
            fullWidth
            variant="filled"
            id="des"
            onChange={(e) => handlePutChange(e)}
            defaultValue={parseInt(dialog.trailer.split("!!!")[1])}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handlePut(e, dialog.idPhim)}>Sửa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GetMovie;
