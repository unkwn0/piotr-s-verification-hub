import { useLang } from "@/contexts/LangContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const metrics = [
  { label: "Total verified", value: "247", context: "+18 this month" },
  { label: "Avg confidence", value: "72%", context: "High" },
  { label: "Most common verdict", value: "Partially true", context: "34% of all" },
  { label: "Top category", value: "Politics", context: "89 claims" },
];

const verdictData = [
  { name: "True", value: 58, color: "#4ade80" },
  { name: "False", value: 31, color: "#f87171" },
  { name: "Partially true", value: 84, color: "#facc15" },
  { name: "Unverifiable", value: 42, color: "#71717a" },
  { name: "In progress", value: 32, color: "#38bdf8" },
];

const categoryData = [
  { name: "Politics", value: 89 },
  { name: "Economy", value: 54 },
  { name: "Science", value: 47 },
  { name: "History", value: 32 },
  { name: "Other", value: 25 },
];

const monthlyData = [
  { month: "Apr'25", value: 12 },
  { month: "May", value: 15 },
  { month: "Jun", value: 22 },
  { month: "Jul", value: 18 },
  { month: "Aug", value: 25 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 28 },
  { month: "Nov", value: 24 },
  { month: "Dec", value: 16 },
  { month: "Jan'26", value: 21 },
  { month: "Feb", value: 28 },
  { month: "Mar", value: 18 },
];

const recentData = [
  { date: "2026-03-12", claim: "Polish government claims unemployment rate dropped to 4.2%", category: "Politics", verdict: "Partially true", confidence: 78 },
  { date: "2026-03-10", claim: "Tesla reports 50% increase in European deliveries Q1 2026", category: "Economy", verdict: "False", confidence: 91 },
  { date: "2026-03-08", claim: "New study links daily coffee consumption to longevity", category: "Science", verdict: "Unverifiable", confidence: 34 },
  { date: "2026-03-05", claim: "Historical claim: first Polish constitution preceded French", category: "History", verdict: "True", confidence: 95 },
  { date: "2026-03-03", claim: "AI startup claims 1000x speedup over traditional methods", category: "Science", verdict: "False", confidence: 87 },
  { date: "2026-03-01", claim: "Ministry of Finance announces new crypto tax regulations", category: "Politics", verdict: "In progress", confidence: 45 },
];

const verdictColor: Record<string, string> = {
  True: "#4ade80",
  False: "#f87171",
  "Partially true": "#facc15",
  Unverifiable: "#71717a",
  "In progress": "#38bdf8",
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-primary bg-card px-3 py-2 font-mono text-xs text-foreground">
      <p>{label}</p>
      <p className="text-primary">{payload[0].value} claims</p>
    </div>
  );
};

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-primary bg-card px-3 py-2 font-mono text-xs text-foreground">
      <p>{label}</p>
      <p className="text-primary">{payload[0].value} verifications</p>
    </div>
  );
};

const AnalyticsView = () => {
  const { t } = useLang();

  return (
    <div className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-widest">
          Verification Dashboard
        </h2>
        <p className="font-mono text-xs text-muted-foreground mt-1 mb-8">
          Fact-checking analytics — mock data
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {metrics.map((m, i) => (
            <div key={i} className="border border-border bg-card p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {m.label}
              </div>
              <div className="font-mono text-3xl font-bold text-foreground mt-2">{m.value}</div>
              <div className="font-mono text-xs text-primary mt-1">{m.context}</div>
            </div>
          ))}
        </div>

        {/* Donut + Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border mt-px">
          {/* Donut */}
          <div className="border border-border bg-card p-6 lg:col-span-1">
            <div className="font-mono uppercase text-xs text-muted-foreground mb-4">
              Verdict Distribution
            </div>
            <div className="relative flex justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={verdictData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {verdictData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-3xl font-bold text-foreground">247</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {verdictData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5" style={{ backgroundColor: d.color }} />
                  <span className="font-mono text-xs text-muted-foreground">
                    {d.name} {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar */}
          <div className="border border-border bg-card p-6 lg:col-span-2">
            <div className="font-mono uppercase text-xs text-muted-foreground mb-4">
              Claims by Category
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(240 3.8% 66.1%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(240 3.8% 66.1%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={false} />
                <Bar dataKey="value" fill="#22d3ee" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area chart */}
        <div className="border border-border bg-card p-6 mt-px">
          <div className="font-mono uppercase text-xs text-muted-foreground mb-4">
            Monthly Activity — Last 12 Months
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(240 3.8% 66.1%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(240 3.8% 66.1%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              />
              <Tooltip content={<CustomAreaTooltip />} cursor={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#areaGrad)"
                dot={{ fill: "#22d3ee", r: 3, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="border border-border bg-card p-6 mt-px">
          <div className="font-mono uppercase text-xs text-muted-foreground mb-4">
            Recent Verifications
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  {["Date", "Claim", "Category", "Verdict", "Confidence"].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-xs uppercase tracking-wider text-muted-foreground py-3 pr-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentData.map((row, i) => {
                  const vc = verdictColor[row.verdict] || "#71717a";
                  return (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="font-mono text-xs text-muted-foreground py-3 pr-4 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="text-sm text-foreground py-3 pr-4 max-w-xs">
                        {row.claim}
                      </td>
                      <td className="font-mono text-xs text-muted-foreground py-3 pr-4 whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <span
                          className="font-mono text-xs px-2 py-0.5 border"
                          style={{ borderColor: vc, color: vc }}
                        >
                          {row.verdict}
                        </span>
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            {row.confidence}%
                          </span>
                          <div className="w-20 h-1.5 bg-muted">
                            <div
                              className="h-full"
                              style={{
                                width: `${row.confidence}%`,
                                backgroundColor: vc,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
