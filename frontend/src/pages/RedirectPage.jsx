import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import ErrorBox from "../components/ErrorBox";
import axios from "axios";
export default function RedirectPage() {
  const { code } = useParams();
  const [status, setStatus] = useState("loading");
  console.log('mohit bajaj');

  useEffect(async () => {
    await axios.get(`http://localhost:5000/api/${code}`)
  }, [code]);

  return <LoadingBox message="Redirecting..." />;
}



