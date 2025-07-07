import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

export default function IAStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.getIaStatus().then((res) => setStatus(res.data));
  }, []);

  if (!status) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🤖 État de l'IA</h2>
      <p>Status : <strong>{status.status}</strong></p>
      <p>Timestamp : {status.timestamp}</p>
    </div>
  );
}