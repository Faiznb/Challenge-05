import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoginOauth from "../Components/OAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        name,
        email,
        password,
      });

      let config = {
        method: "post",
        url: `${import.meta.env.VITE_API}/v1/auth/register`,
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
              <h4 className="fw-bold">HALAMAN REGISTER</h4>
              <hr />
              <form onSubmit={registerHandler}>
                <div>
                  <div className="mb-3">
                    <label className="form-label">ALAMAT EMAIL</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">NAMA LENGKAP</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Lengkap" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">PASSWORD</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                  </div>
                  {validation.message && <div className="alert alert-danger mt-3">{validation.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">
                  REGISTER
                </button>
              </form>
              <p className="mt-3">
                Sudah punya akun ?
                <Link to="/Login" className="">
                  Klik Disini
                </Link>
                , untuk Login
              </p>
              <div className="text-center">
                <LoginOauth buttonText="Register with Google" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
