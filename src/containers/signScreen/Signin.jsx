import React, { useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import "./style.css";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history1 = useHistory();

  const dangNhap = useCallback(() => {
    axios
      .post("http://192.168.1.23:3000/user/sign-in", {
        username: userName,
        password: password,
      })
      .then(function (response) {
        //console.log(response);
        if (response.status === 201) {
          window.localStorage.setItem("asstoken", response.data.accessToken);
          history1.push("/home");
        } else {
          console.log("Tai khoan khong dung");
        }
      })

      .catch(function (error) {
        console.log(error);
      });

    // axios.get("http://192.168.1.23:3000/user").then((e) => {
    //   console.log(e);
    //});
  });

  return (
    <SignupeWraper>
      <div className="form-input">
        <label className="form-label">User Name</label>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div className="form-input">
        <label className="form-label">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="button-div">
        <button className="form-button" onClick={() => dangNhap()}>
          Đăng nhập
        </button>
      </div>

      <div className="form-text">
        <p className="text">Have a account ?</p>
        <Link className="form-link" to="/signup">
          Signup
        </Link>
      </div>
    </SignupeWraper>
  );
}

const SignupeWraper = styled.div``;

// post man
// styled
// config axios
// login logic
