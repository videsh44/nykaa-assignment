import React, { useState, useEffect } from "react";
import { message, Input, Button } from "antd";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../src/actions/authActions";
import { adminLogin } from "../src/actions";
import history from "./history";

import "antd/dist/antd.css";
import SignUp from "./SignUp";

const Login = (props) => {
  //const [isLoged, setIsLoged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [screenType, setScreenType] = useState("login");

  // console.log(props.cookies);
  //  console.log(props.userAuth.isSignedIn);

  const setCookies = () => {
    if (props.userAuth.isSignedIn) {
      const { cookies } = props;
      if (cookies) {
        const {
          Authorization,
          isSignedIn,
          userId,
          userType,
          userName,
        } = props.userAuth;
        cookies.set("Authorization", Authorization, { path: "/" });
        cookies.set("isSignedIn", isSignedIn, { path: "/" });
        cookies.set("userId", userId, { path: "/" });
        cookies.set("userType", userType, { path: "/" });
        cookies.set("userName", userName, { path: "/" });
      }
      // console.log("yes");

      //  history.push("/");
    }
  };

  useEffect(() => {
    history.push("/nykaa-assignment");
    setCookies();
  }, [props.userAuth.isSignedIn]);

  const handleLogin = async () => {
    if (email === "" || email === null || email === undefined) {
      message.warning("Please Enter Email");
      return;
    }
    if (password === "" || password === null || password === undefined) {
      message.warning("Please Enter password");
      return;
    }

    let formValues = {
      email,
      password,
    };

    // props.loginUser(formValues);

    try {
      const response = await adminLogin(formValues);
      // console.log(response);
      if (response.status === 200) {
        props.loginUser(response.data);
        localStorage.setItem("user_type", response.data.user_type);
        history.push("/home");
      }
    } catch (error) {
      message.warning(error.response.data.error.message);
    }
  };

  const onUserNameChange = (e) => {
    //console.log(e.target.value);
    setEmail(e.target.value);
  };

  const onPassChange = (e) => {
    //console.log(e.target.value);
    setPassword(e.target.value);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/bc/27/60/bc27609dca848b8853968d5cf11e6692.jpg')",
        width: "100%",
        backgroundRepeat: "repeat-x",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: "520px",
            margin: "0px auto",
            padding: "30px",
            background: "#fff",
            boxShadow: "-1px 4px 28px 0px rgba(0,0,0,0.75)",
            marginTop: "15%",
            color: "#000",
          }}
        >
          {screenType === "login" ? (
            <div>
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://img.icons8.com/carbon-copy/2x/login-rounded-right.png"
                  width="100px"
                />
              </div>
              <div style={{ margin: "30px" }}>
                <label>Username</label>
                <Input onChange={onUserNameChange} placeholder="username " />
              </div>
              <div style={{ margin: "30px" }}>
                <label>Password</label>
                <Input
                  onChange={onPassChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={handleLogin}
                  type="primary"
                  className="login-form-btn"
                >
                  Log in
                </Button>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "40px",
                  fontSize: "16px",
                }}
              >
                <span style={{ textAlign: "center", marginTop: "40px" }}>
                  <h6>OR</h6>
                </span>
                <Button onClick={() => setScreenType("signup")}>
                  No account? Create one here
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <SignUp setScreenType={setScreenType} />
              <div
                style={{ textAlign: "center", marginTop: "40px !important" }}
              >
                <Button onClick={() => setScreenType("login")}>
                  Already a user Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { userAuth: state.userAuth, cookies: ownProps.cookies };
};
export default connect(mapStateToProps, { loginUser, logoutUser })(Login);
