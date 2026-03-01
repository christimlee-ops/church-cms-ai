"use client";

import { useState, useEffect } from "react";
import { FiLoader, FiEye, FiUsers, FiTrendingUp, FiBarChart2 } from "react-icons/fi";

interface AnalyticsData {
  summary: {
    pageViews7d: number;
    activeUsers7d: number;
    pageViews30d: number;
    activeUsers30d: number;
  };
  topPages: { path: string; views: number }[];
  dailySessions: { date: string; sessions: number }[];
}

function formatDate(dateStr: string) {
  // dateStr is "YYYYMMDD"
  return `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
}

function SessionChart({ data }: { data: { date: string; sessions: number }[] }) {
  if (data.length === 0) return null;

  const maxSessions = Math.max(...data.map((d) => d.sessions), 1);
  const width = 700;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - (d.sessions / maxSessions) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  // Y-axis labels
  const yLabels = [0, Math.round(maxSessions / 2), maxSessions];

  // X-axis labels (show ~6 evenly spaced dates)
  const xStep = Math.max(1, Math.floor(data.length / 6));
  const xLabels = data.filter((_, i) => i % xStep === 0 || i === data.length - 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {yLabels.map((val) => {
        const y = padding.top + chartH - (val / maxSessions) * chartH;
        return (
          <g key={val}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-gray-400" fontSize="10">
              {val}
            </text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGradient)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#1e3a5f" strokeWidth="2" />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#1e3a5f" />
      ))}
      {/* X-axis labels */}
      {xLabels.map((d) => {
        const idx = data.indexOf(d);
        const x = padding.left + (idx / (data.length - 1)) * chartW;
        return (
          <text key={d.date} x={x} y={height - 5} textAnchor="middle" className="fill-gray-400" fontSize="10">
            {formatDate(d.date)}
          </text>
        );
      })}
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.02" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/analytics")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load analytics");
        return json;
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-navy-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Analytics</h1>
          <p className="text-secondary-500 mt-1">Website traffic and visitor insights</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-xl">
          <p className="font-medium">Analytics unavailable</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    { label: "Page Views (7d)", value: data.summary.pageViews7d.toLocaleString(), icon: FiEye, color: "bg-blue-50 text-blue-600" },
    { label: "Page Views (30d)", value: data.summary.pageViews30d.toLocaleString(), icon: FiBarChart2, color: "bg-indigo-50 text-indigo-600" },
    { label: "Active Users (7d)", value: data.summary.activeUsers7d.toLocaleString(), icon: FiUsers, color: "bg-green-50 text-green-600" },
    { label: "Active Users (30d)", value: data.summary.activeUsers30d.toLocaleString(), icon: FiTrendingUp, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-800">Analytics</h1>
        <p className="text-secondary-500 mt-1">Website traffic and visitor insights</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-secondary-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-heading font-bold text-secondary-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sessions Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-heading font-semibold text-secondary-800 mb-4">Daily Sessions (30 days)</h2>
        {data.dailySessions.length > 0 ? (
          <SessionChart data={data.dailySessions} />
        ) : (
          <p className="text-secondary-400 text-sm">No session data available</p>
        )}
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-heading font-semibold text-secondary-800 mb-4">Top Pages (30 days)</h2>
        {data.topPages.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-secondary-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Page</th>
                <th className="pb-3 font-medium text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {data.topPages.map((page, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-sm text-secondary-700 font-mono">{page.path}</td>
                  <td className="py-3 text-sm text-secondary-800 font-semibold text-right">{page.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-secondary-400 text-sm">No page data available</p>
        )}
      </div>
    </div>
  );
}
