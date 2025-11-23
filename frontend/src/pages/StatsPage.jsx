// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import LoadingBox from "../components/LoadingBox";
// import ErrorBox from "../components/ErrorBox";
// import StatCard from "../components/StatCard";

// import { getLinkStats } from "../utils/api";

// export default function StatsPage() {
//   const { code } = useParams();
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       setLoading(true);
//       const result = await getLinkStats(code);

//       if (result.error) setError(result.error);
//       else setData(result);

//       setLoading(false);
//     }
//     load();
//   }, [code]);

//   if (loading) return <LoadingBox message="Loading stats..." />;
//   if (error) return <ErrorBox message={error} />;

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">
//         Stats for <span className="text-indigo-600">{data.code}</span>
//       </h2>
//       <StatCard title="Total Clicks" value={data.clicks} />
//       <div className="bg-white border rounded p-4">
//         <h3 className="font-semibold mb-2">Destination URL</h3>
//         <div className="text-sm">{data.url}</div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import ErrorBox from "../components/ErrorBox";
import StatCard from "../components/StatCard";

import { getLinkStats } from "../utils/api";

export default function StatsPage() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await getLinkStats(code);

      if (result.error) setError(result.error);
      else setData(result);

      setLoading(false);
    }
    load();
  }, [code]);

  if (loading) return <LoadingBox message="Loading stats..." />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Stats for <span className="text-indigo-600">{data.code}</span>
      </h2>

      {/* Total Clicks */}
      <StatCard title="Total Clicks" value={data.clicks} />

      {/* Short Code */}
      <StatCard title="Short Code" value={data.code} />

      {/* Created At */}
      <StatCard
        title="Created At"
        value={new Date(data.created_at).toLocaleString()}
      />

      {/* Last Clicked */}
      <StatCard
        title="Last Clicked"
        value={
          data.last_clicked
            ? new Date(data.last_clicked).toLocaleString()
            : "Never clicked"
        }
      />

      {/* Destination URL */}
      <div className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-2">Destination URL</h3>
        <div className="text-sm">{data.url}</div>
      </div>
    </div>
  );
}
