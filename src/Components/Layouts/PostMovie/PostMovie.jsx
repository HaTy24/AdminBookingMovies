import React, { useState, useEffect } from "react";
import Axios from "axios";
import BaseUrl from "../../api/BaseURL";
// import "./PostMovie.scss";
import "../../Scss/post.scss";

function PostMovie() {
  const [value, setValue] = useState({
    idtl: "",
    tenphim: "",
    thoiluong: "",
    image: "",
    trailer: "",
    des: "",
  });
  const [result, setResult] = useState([]);
  const [img, setImg] = useState(
    "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
  );

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/TheLoai")
      .then((response) => response.json())
      .then((data) => setResult(data));
  }, []);
  const handleValue = (e) => {
    let newdata = { ...value };
    newdata[e.target.id] = e.target.value;
    setValue(newdata);
    newdata.image == "" ? console.log("hhhh") : setImg(newdata.image);
  };

  const handlePost = (e) => {
    e.preventDefault();
    value.tenphim == "" ||
    value.des == "" ||
    value.idtl == "" ||
    value.image == "" ||
    value.thoiluong == "" ||
    value.trailer == ""
      ? alert("Nhập đầy đủ thông tin !!!")
      : Axios.post(BaseUrl.baseUrl + "/Phim", {
          idTheLoai: parseInt(value.idtl),
          tenPhim: value.tenphim,
          thoiLuong: value.thoiluong,
          image: value.image,
          trailer: value.trailer + "!!!" + value.des,
        })
          .then(
            setValue({
              idtl: "",
              tenphim: "",
              thoiluong: "",
              image: "",
              trailer: "",
              des: "",
            })
          )
          .then(alert("Thêm phim thành công !!!"))
          .catch(function (error) {
            console.log(error);
          });
  };
  return (
    <div className="postMovie">
      <form onSubmit={(e) => handlePost(e)}>
        <label htmlFor="idtl">Thể loại</label>
        <select
          className="postMovie-input"
          id="idtl"
          onChange={(e) => {
            handleValue(e);
          }}
        >
          <option>-- Chọn thể loại --</option>
          {result.map((item, i) => {
            return (
              <option key={i} value={item.idTheLoai}>
                {item.tenTheLoai}
              </option>
            );
          })}
        </select>
        <label htmlFor="tenphim">Tên phim</label>
        <input
          id="tenphim"
          onChange={(e) => handleValue(e)}
          type="text"
          className="postMovie-input"
          value={value.tenphim}
        />
        <label htmlFor="thoiluong">Thời lượng</label>
        <input
          id="thoiluong"
          onChange={(e) => handleValue(e)}
          type="text"
          className="postMovie-input"
          value={value.thoiluong}
        />
        <label htmlFor="image">Hình ảnh</label>
        <input
          id="image"
          onChange={(e) => handleValue(e)}
          type="text"
          className="postMovie-input"
          value={value.image}
        />
        <label htmlFor="trailer">Trailer</label>
        <input
          id="trailer"
          onChange={(e) => handleValue(e)}
          type="text"
          className="postMovie-input"
          value={value.trailer}
        />
        <label htmlFor="des">Mô tả</label>
        <input
          id="des"
          onChange={(e) => handleValue(e)}
          type="text"
          className="postMovie-input"
          value={value.des}
        />
        <button className="postMovie-btn">Post</button>
      </form>
      <img style={{ display: "block" }} src={img} alt="" />
    </div>
  );
}

export default PostMovie;
