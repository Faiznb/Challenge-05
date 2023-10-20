import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/header";

const MovieDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      navigate("/");
    }
  }, [token, navigate]);

  const fetchMovieDetail = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/v1/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovie(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div>
        <div className={`carousel-item c-item p-0 carousel-item active`}>
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="d-block w-100 c-img" alt="..." />
          <div className="carousel-caption d-none d-md-flex flex-column justify-content-center c-content">
            <h1>{movie.title}</h1>
            <p className="">{movie.overview}</p>
            <p>Genre : {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p> Rating : {movie.vote_average}</p>
            <p> Release Date : {movie.release_date}</p>
            <button type="button" className="btn btn-danger">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
