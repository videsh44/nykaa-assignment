import React, { useState, useEffect } from "react";

import history from "../history";
import { useSelector, useDispatch, connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { withCookies } from "react-cookie";
import { nykaaLogo } from "../assets/IconAssets";

const MenuIndex = (props) => {
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid black",
          padding: "10px",
          background: "#87CEFA",
          boxShadow: "0px 0px 9px 3px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 12344567,
        }}
      >
        <div style={{ marginLeft: "30px" }}>
          <img
            src={nykaaLogo}
            style={{ width: "90px", objectFit: "contain" }}
          />
        </div>
      </div>

      <div style={{ marginTop: "100px" }}>{props.children}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userAuth,
  };
};

export default withCookies(connect(mapStateToProps, { logoutUser })(MenuIndex));
