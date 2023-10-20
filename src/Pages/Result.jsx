import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SearchResult = () => {
  const token = localStorage.getItem("token");
  const { query } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      navigate("/");
    }
  }, [token, navigate]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/v1/search/movie?page=1&query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [query]);

  return (
    <>
      <div className="d-flex justify-content-around  align-items-center mt-2">
        <h1 className="Hasil">Hasil Pencarian: {`${query}`}</h1>
        <Link to={"/"} className="btn btn-primary back">
          Kembali
        </Link>
      </div>
      <div className="container">
        <div className="row  row-cols-4">
          {results.map((movie) => (
            <div className="col">
              <Link to={`/detail/${movie.id}`} className="card" key={movie.id}>
                <div>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                  <div className="card-body mv-title d-flex  justify-content-center  align-items-center">
                    <h5 className="card-title mv-body">{movie.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
