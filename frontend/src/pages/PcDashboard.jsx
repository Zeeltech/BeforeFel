import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyPc = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/dashboard", { withCredentials: true })
      .then((response) => {})
      .catch((err) => navigate("/login/pc"));
  });

  return <>{<div>Hii</div>}</>;
};

export default VerifyPc;
