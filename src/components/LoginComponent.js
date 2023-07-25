import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authoriza";
import { useNavigate } from "react-router-dom";
import { withRouter } from "../services/withRouter";

const LoginComponent = (props) => {
  const [state, setState] = useState({
    username: "admin",
    password: "admin123",
  });
  const { username, password } = state;
  let navigate = useNavigate();

  const inputValue = (name) => (event) => {
    // console.log(name,'=',event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((response) => {
        //login สำเร็จ
        console.log("login succes");
        authenticate(response, () => navigate("/create"));
      })
      .catch((err) => {
        console.log(err.response.data.error);
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  useEffect(() => {
    getUser() && navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เข้าสู่ระบบ | Admin</h1>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
      </form>
    </div>
  );
};
// export default LoginComponent
export default withRouter(LoginComponent);
