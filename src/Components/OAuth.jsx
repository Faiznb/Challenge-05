import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginOauth({ buttonText }) {
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/v1/auth/google`,
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
      if (axios.isAxiosError(error)) {
        console.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <button className="btn btn-primary" onClick={() => loginWithGoogle()}>
      {buttonText}
    </button>
  );
}

export default LoginOauth;
