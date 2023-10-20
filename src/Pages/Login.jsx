import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginOauth from "../Components/OAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
        password,
      });

      let config = {
        method: "post",
        url: `${import.meta.env.VITE_API}/v1/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      setValidation(error.response.data);
      if (error.response) {
        console.error("HTTP Error:", error.response.status, error.response.data);
      }
      console.log(validation);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body bg-dark text-light">
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                </div>
                {validation.message && <div className="alert alert-danger">{validation.message}</div>}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
              <p className="mt-3">
                Belum punya akun ?
                <Link to="/register" className="">
                  Klik Disini
                </Link>
                , untuk daftar
              </p>
              <div className="text-center">
                <LoginOauth buttonText="Login with Google" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
