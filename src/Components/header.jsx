import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "./user";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);
  const handleSearch = () => {
    navigate(`/results/${query}`);
  };

  return (
    <div className="header d-flex justify-content-around align-item-center">
      <Link to={"/"} className="btn h-logo">
        Movielist
      </Link>
      <div className="input-group h-input my-3">
        <input className="form-control input-s" type="text" placeholder="Cari..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-outline-danger" onClick={handleSearch}>
          Cari
        </button>
      </div>
      {isLogin ? (
        <div className="d-flex">
          <User />
          <button
            className="btn btn-outline-danger mx-2 my-3"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLogin(false);
              window.location.reload();
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="d-flex ">
          <Link to={"/Login"} className="btn btn-outline-danger mx-2 my-3">
            Login
          </Link>
          <Link to={"/Register"} className="btn btn-danger ms-4 my-3">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
