import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

export default function IAPredictions() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getPredictions().then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📈 Prédictions IA</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}