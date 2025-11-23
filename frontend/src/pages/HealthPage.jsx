import React, { useEffect, useState } from "react";
export default function HealthPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/healthz")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Health Status</h2>
      <pre className="bg-white border rounded p-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
