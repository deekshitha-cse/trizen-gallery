"use client";

import {useEffect, useState} from "react";

export default function Home() {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
      async function getHealth() {
        try{
          const response = await fetch("http://localhost:3000/health");
          const data = await response.json();
          setStatus(data.status);
        } catch(error) {
          setStatus("Backend connection failed!");
        }
      }
      getHealth();
    }, []);

  return (
    <main>
      <h1> Trizen Gallary </h1>
      <p> Backend status: {status} </p>
    </main>
  )
}