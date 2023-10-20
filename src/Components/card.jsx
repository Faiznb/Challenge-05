import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const movies = await axios.get(`${import.meta.env.VITE_API}/v1/movie/popular`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(movies.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data.map((movie) => (
        <div className="col" key={movie.id}>
          <Link to={`/detail/${movie.id}`} className="card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
            <div className="card-body mv-title d-flex  justify-content-center  align-items-center">
              <h5 className="card-title mv-body">{movie.title}</h5>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Card;
