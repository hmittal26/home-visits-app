import { supabase } from "./supabase";

import { useState, useEffect } from "react";

const C = {
  bg:"#FDF6EE",
  card:"#FFFAF4",
  ink:"#1C1410",
  soft:"#7A6A5A",
  accent:"#D4570A",
  accentLight:"#FEF0E6",
  border:"#E8DDD0",
  green:"#2D6A4F",
  greenLight:"#D8F0E6",
  gold:"#B8860B",
  goldLight:"#FFF8DC",
  blue:"#1A5276",
  blueLight:"#D6EAF8",
  purple:"#6C3483",
  purpleLight:"#F4ECF7",
};

// ───────────────── LOGO ─────────────────
function BSGLogo({ size = 48 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#1C1410",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 18,
      }}
    >
      BSG
    </div>
  );
}

// ───────────────── SEED DATA ─────────────────
function makeSeed() {
  const raw = [
    {visitor:"Utkarsh", host:"Partha", d:"2026-05-01"},
    {visitor:"Utkarsh", host:"Nitin", d:"2026-05-03"},
    {visitor:"Utkarsh", host:"Shoshokai Friend", d:"2026-05-05"},
    {visitor:"Utkarsh", host:"Rishi", d:"2026-05-08"},
    {visitor:"Utkarsh", host:"Sonu", d:"2026-05-12"},

    {visitor:"Rishi", host:"Anandu", d:"2026-05-02"},
    {visitor:"Rishi", host:"Arun", d:"2026-05-06"},
    {visitor:"Rishi", host:"Utkarsh", d:"2026-05-10"},

    {visitor:"Priti", host:"Rekha Vaid", d:"2026-05-01"},
    {visitor:"Priti", host:"Divya", d:"2026-05-04"},
    {visitor:"Priti", host:"Vartika", d:"2026-05-07"},
    {visitor:"Priti", host:"Dr Rekha", d:"2026-05-09"},
    {visitor:"Priti", host:"Jiya", d:"2026-05-13"},

    {visitor:"Ruchika", host:"Anjali NF", d:"2026-05-01"},
    {visitor:"Ruchika", host:"Geetika", d:"2026-05-02"},
    {visitor:"Ruchika", host:"Vartika", d:"2026-05-03"},
    {visitor:"Ruchika", host:"Others 1", d:"2026-05-04"},
    {visitor:"Ruchika", host:"Others 2", d:"2026-05-05"},
    {visitor:"Ruchika", host:"Others 3", d:"2026-05-06"},
    {visitor:"Ruchika", host:"Others 4", d:"2026-05-07"},
    {visitor:"Ruchika", host:"Others 5", d:"2026-05-08"},
    {visitor:"Ruchika", host:"Others 6", d:"2026-05-10"},
    {visitor:"Ruchika", host:"Others 7", d:"2026-05-12"},
    {visitor:"Ruchika", host:"Others 8", d:"2026-05-14"},

    {visitor:"Yash", host:"Krish NF", d:"2026-05-02"},
    {visitor:"Yash", host:"Other District 1", d:"2026-05-05"},
    {visitor:"Yash", host:"Sonu", d:"2026-05-08"},
    {visitor:"Yash", host:"NF", d:"2026-05-11"},
    {visitor:"Yash", host:"Other District 2", d:"2026-05-14"},

    {visitor:"Aditi", host:"Jiya", d:"2026-05-04"},
    {visitor:"Aditi", host:"Dr Rekha", d:"2026-05-09"},

    {visitor:"Dr Rekha", host:"Kalyani", d:"2026-05-02"},
    {visitor:"Dr Rekha", host:"Aditi", d:"2026-05-05"},
    {visitor:"Dr Rekha", host:"Priti", d:"2026-05-08"},
    {visitor:"Dr Rekha", host:"Geetika", d:"2026-05-13"},

    {visitor:"Surabhi", host:"Chahat", d:"2026-05-07"},

    {visitor:"Priyanka", host:"Jiya", d:"2026-05-06"},
    {visitor:"Priyanka", host:"Manya", d:"2026-05-11"},

    {visitor:"Geetika", host:"Ruchika", d:"2026-05-05"},
    {visitor:"Geetika", host:"Dr Rekha", d:"2026-05-10"},

    {visitor:"Vartika", host:"Ruchika", d:"2026-05-04"},
    {visitor:"Vartika", host:"Priti", d:"2026-05-09"},

    {visitor:"Divya", host:"Priti", d:"2026-05-06"},

    {visitor:"Jiya", host:"Priti", d:"2026-05-03"},
    {visitor:"Jiya", host:"Ruchika", d:"2026-05-07"},
    {visitor:"Jiya", host:"Aditi", d:"2026-05-11"},
    {visitor:"Jiya", host:"Priyanka", d:"2026-05-14"},

    {visitor:"Sonu", host:"Yash", d:"2026-05-05"},
    {visitor:"Sonu", host:"Utkarsh", d:"2026-05-09"},

    {visitor:"Anandu", host:"Rishi", d:"2026-05-06"},
    {visitor:"Nitin", host:"Utkarsh", d:"2026-05-08"},
  ];

  return raw.map((v, i) => ({
    id: 2000 + i,
    visitor: v.visitor,
    host: v.host,
    date: new Date(v.d + "T10:00:00").toISOString(),
    note: "",
    logged: new Date(v.d + "T10:05:00").toISOString(),
  }));
}
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

const monthKey = (iso) => {
  const d = new Date(iso);

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const monthLabel = (key) => {
  const [y, m] = key.split("-");

  return new Date(y, m - 1).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

const medals = ["🥇", "🥈", "🥉"];

const iStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "9px 12px",
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "'Georgia', serif",
  background: "#fff",
  color: C.ink,
  outline: "none",
};

// ───────────────── MAIN APP ─────────────────

export default function App() {
  const [visits, setVisits] = useState([]);
  const [page, setPage] = useState("log");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("");

  const [form, setForm] = useState({
    visitor: "",
    host: "",
    date: "",
    note: "",
  });

 useEffect(() => {
  fetchVisits();

  const channel = supabase
    .channel("visits-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "visits",
      },
      () => {
        fetchVisits();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

async function fetchVisits() {
  const { data } = await supabase
    .from("visits")
    .select("*")
    .order("date", { ascending: false });

  if (data) {
    setVisits(data);
  }

  setLoading(false);
}

 

  async function addVisit() {
  if (!form.visitor.trim() || !form.host.trim()) return;

  await supabase.from("visits").insert([
    {
      visitor: form.visitor.trim(),
      host: form.host.trim(),
      date: form.date || new Date().toISOString(),
      note: form.note.trim(),
    },
  ]);

  setForm({
    visitor: "",
    host: "",
    date: "",
    note: "",
  });

  setAdding(false);
}

async function remove(id) {
  await supabase
    .from("visits")
    .delete()
    .eq("id", id);
}

const pages = [
  ["log", "📋 Log"],
  ["summary", "📊 Summary"],
  ["person", "👤 By Person"],
];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: "'Georgia','Times New Roman',serif",
        color: C.ink,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: C.card,
          borderBottom: `1px solid ${C.border}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <BSGLogo size={46} />

              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.soft,
                  }}
                >
                  Bharat Soka Gakkai
                </div>

                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    lineHeight: 1.15,
                    color: C.ink,
                  }}
                >
                  Home Visits
                </div>

                <div
                  style={{
                    fontSize: 10,
                    color: C.soft,
                    letterSpacing: "0.05em",
                  }}
                >
                  Community Connect Tracker
                </div>
              </div>
            </div>

            {page === "log" && (
              <div
                style={{
                  textAlign: "right",
                  fontSize: 10,
                  color: C.soft,
                  fontStyle: "italic",
                  lineHeight: 1.3,
                }}
              >
                Designed by
                <br />

                <span
                  style={{
                    fontWeight: 700,
                    color: C.accent,
                    fontStyle: "normal",
                    fontSize: 11,
                  }}
                >
                  Himanshi Mittal
                </span>
              </div>
            )}
          </div>

          {/* NAV */}
          <div style={{ display: "flex", gap: 5 }}>
            {pages.map(([p, label]) => (
              <button
                key={p}
                onClick={() => {
                  setPage(p);
                  setAdding(false);
                }}
                style={{
                  flex: 1,
                  padding: "7px 6px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 12,
                  fontWeight: 600,
                  background: page === p ? C.accent : C.border,
                  color: page === p ? "#fff" : C.soft,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
            {loading ? (
        <div
          style={{
            textAlign: "center",
            color: C.soft,
            marginTop: 80,
            fontSize: 14,
          }}
        >
          Loading...
        </div>
      ) : page === "log" ? (
        <LogPage
          visits={visits}
          filter={filter}
          setFilter={setFilter}
          adding={adding}
          setAdding={setAdding}
          form={form}
          setForm={setForm}
          addVisit={addVisit}
          remove={remove}
        />
      ) : page === "summary" ? (
        <SummaryPage visits={visits} />
      ) : (
        <PersonPage visits={visits} />
      )}
    </div>
  );
}

// ───────────────── LOG PAGE ─────────────────

function LogPage({
  visits,
  filter,
  setFilter,
  adding,
  setAdding,
  form,
  setForm,
  addVisit,
  remove,
}) {
  const filtered = visits.filter(
    (v) =>
      !filter ||
      v.visitor.toLowerCase().includes(filter.toLowerCase()) ||
      v.host.toLowerCase().includes(filter.toLowerCase())
  );

  const groups = {};

  filtered.forEach((v) => {
    const k = new Date(v.date).toDateString();

    (groups[k] = groups[k] || []).push(v);
  });

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "0 16px 60px",
      }}
    >
      <div
        style={{
          padding: "12px 0 6px",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            ...iStyle,
            flex: 1,
            padding: "8px 12px",
          }}
        />

        <button
          onClick={() => setAdding(!adding)}
          style={{
            background: adding ? C.border : C.accent,
            color: adding ? C.ink : "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          {adding ? "Cancel" : "+ Add"}
        </button>
      </div>

      <div
        style={{
          fontSize: 12,
          color: C.soft,
          marginBottom: 8,
        }}
      >
        {visits.length} total visits · {filtered.length} shown
      </div>

      {adding && (
        <div
          style={{
            background: C.accentLight,
            border: `1px solid ${C.accent}`,
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: "0.08em",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            Add Home Visit
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div>
              <Lab>Visitor</Lab>

              <input
                value={form.visitor}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    visitor: e.target.value,
                  }))
                }
                style={iStyle}
              />
            </div>

            <div>
              <Lab>Host</Lab>

              <input
                value={form.host}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    host: e.target.value,
                  }))
                }
                style={iStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <Lab>Date & Time</Lab>

            <input
              type="datetime-local"
              value={form.date}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  date: e.target.value,
                }))
              }
              style={iStyle}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <Lab>Note (optional)</Lab>

            <input
              value={form.note}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  note: e.target.value,
                }))
              }
              style={iStyle}
            />
          </div>

          <button
            onClick={addVisit}
            disabled={!form.visitor.trim() || !form.host.trim()}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: 10,
              border: "none",
              background: C.accent,
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Save Visit
          </button>
        </div>
      )}

            {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: C.soft,
            marginTop: 60,
          }}
        >
          <div style={{ fontSize: 36 }}>🏠</div>
          <div>No visits found.</div>
        </div>
      ) : (
        Object.entries(groups).map(([dk, dvs]) => (
          <div key={dk} style={{ marginTop: 16 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.soft,
                marginBottom: 6,
              }}
            >
              {dk}
            </div>

            {dvs.map((v) => (
              <div
                key={v.id}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  marginBottom: 8,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: C.greenLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  🏠
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {v.visitor}

                    <span
                      style={{
                        color: C.soft,
                        fontWeight: 400,
                        margin: "0 5px",
                      }}
                    >
                      →
                    </span>

                    {v.host}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: C.soft,
                      marginTop: 1,
                    }}
                  >
                    {fmtTime(v.date)}
                  </div>

                  {v.note && (
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        fontStyle: "italic",
                        borderLeft: `2px solid ${C.accent}`,
                        paddingLeft: 8,
                      }}
                    >
                      {v.note}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => remove(v.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: C.soft,
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ))
      )}

      <div
        style={{
          textAlign: "center",
          marginTop: 48,
          fontSize: 11,
          color: C.border,
          fontStyle: "italic",
        }}
      >
        Designed with ♡ by Himanshi Mittal
      </div>
    </div>
  );
}

// ───────────────── SUMMARY PAGE ─────────────────

function SummaryPage({ visits }) {
  const months = [...new Set(visits.map((v) => monthKey(v.date)))]
    .sort()
    .reverse();

  const [selMonth, setSelMonth] = useState("all");

  const scoped =
    selMonth === "all"
      ? visits
      : visits.filter((v) => monthKey(v.date) === selMonth);

  const total = scoped.length;

  const madeCount = {};
  const recvCount = {};
  const allPeople = new Set();

  scoped.forEach((v) => {
    madeCount[v.visitor] = (madeCount[v.visitor] || 0) + 1;
    recvCount[v.host] = (recvCount[v.host] || 0) + 1;

    allPeople.add(v.visitor);
    allPeople.add(v.host);
  });

  const totalAct = {};

  [...allPeople].forEach((p) => {
    totalAct[p] = (madeCount[p] || 0) + (recvCount[p] || 0);
  });

  const topVisitors = Object.entries(madeCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topHosts = Object.entries(recvCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const topOverall = Object.entries(totalAct)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const allTable = [...allPeople]
    .map((p) => ({
      name: p,
      made: madeCount[p] || 0,
      recv: recvCount[p] || 0,
      total: (madeCount[p] || 0) + (recvCount[p] || 0),
    }))
    .sort((a, b) => b.total - a.total);

  const maxMade = topVisitors[0]?.[1] || 1;
    const byMonth = {};

  visits.forEach((v) => {
    const k = monthKey(v.date);
    byMonth[k] = (byMonth[k] || 0) + 1;
  });

  const monthRows = Object.entries(byMonth).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const maxMC = Math.max(...monthRows.map((r) => r[1]), 1);

  const mutuals = [];

  const pArr = [...allPeople];

  pArr.forEach((a, ai) =>
    pArr.slice(ai + 1).forEach((b) => {
      if (
        scoped.some((v) => v.visitor === a && v.host === b) &&
        scoped.some((v) => v.visitor === b && v.host === a)
      ) {
        mutuals.push([a, b]);
      }
    })
  );

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "14px 16px 60px",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <Lab>Filter by Month</Lab>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 4,
          }}
        >
          <Chip
            active={selMonth === "all"}
            onClick={() => setSelMonth("all")}
          >
            All Time
          </Chip>

          {months.map((m) => (
            <Chip
              key={m}
              active={selMonth === m}
              onClick={() => setSelMonth(m)}
            >
              {monthLabel(m)}
            </Chip>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <StatBox label="Total HVs" value={total} color={C.accent} />

        <StatBox
          label="Visitors"
          value={Object.keys(madeCount).length}
          color={C.green}
        />

        <StatBox
          label="Hosts"
          value={Object.keys(recvCount).length}
          color={C.blue}
        />
      </div>

      <Section
        title="📅 Month-wise Total"
        sub="Aggregated home visits per month"
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              {["Month", "Visits", "Share"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "5px 8px",
                    color: C.soft,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthRows.map(([k, cnt], i) => {
              const pct = Math.round((cnt / visits.length) * 100);

              return (
                <tr
                  key={k}
                  style={{
                    background:
                      i % 2 === 0 ? "transparent" : C.accentLight,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <td
                    style={{
                      padding: "8px",
                      fontWeight: 600,
                    }}
                  >
                    {monthLabel(k)}
                  </td>

                  <td
                    style={{
                      padding: "8px",
                      color: C.accent,
                      fontWeight: 800,
                      fontSize: 15,
                    }}
                  >
                    {cnt}
                  </td>

                  <td style={{ padding: "8px", minWidth: 100 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          background: C.border,
                          borderRadius: 4,
                          height: 7,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${(cnt / maxMC) * 100}%`,
                            height: "100%",
                            background: C.accent,
                          }}
                        />
                      </div>

                      <span
                        style={{
                          fontSize: 11,
                          color: C.soft,
                          minWidth: 28,
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

            <Section
        title="🏆 Top Visitors"
        sub="Most home visits made"
      >
        {topVisitors.map(([name, count], i) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 9,
            }}
          >
            <div
              style={{
                width: 24,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              {medals[i] || `${i + 1}`}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {name}
                </span>

                <span
                  style={{
                    fontSize: 13,
                    color: C.accent,
                    fontWeight: 700,
                  }}
                >
                  {count} HV{count !== 1 ? "s" : ""}
                </span>
              </div>

              <Bar
                pct={(count / maxMade) * 100}
                color={
                  i === 0
                    ? C.accent
                    : i === 1
                    ? "#C0843A"
                    : "#A0522D"
                }
              />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="⚡ Most Active Overall"
        sub="Made ↑ + Received ↓ combined"
      >
        {topOverall.map(([name, count], i) => {
          const made = madeCount[name] || 0;
          const recv = recvCount[name] || 0;

          return (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 9,
              }}
            >
              <div
                style={{
                  width: 24,
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                {medals[i] || `${i + 1}`}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {name}
                  </span>

                  <span
                    style={{
                      fontSize: 12,
                      color: C.soft,
                    }}
                  >
                    {made > 0 && (
                      <span style={{ color: C.accent }}>
                        ↑{made}
                      </span>
                    )}

                    {made > 0 && recv > 0 && " "}

                    {recv > 0 && (
                      <span style={{ color: C.green }}>
                        ↓{recv}
                      </span>
                    )}

                    <span
                      style={{
                        fontWeight: 800,
                        color: C.ink,
                        marginLeft: 5,
                      }}
                    >
                      ={count}
                    </span>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    height: 7,
                    borderRadius: 4,
                    overflow: "hidden",
                    background: C.border,
                  }}
                >
                  <div
                    style={{
                      width: `${(made / count) * 100}%`,
                      background: C.accent,
                    }}
                  />

                  <div
                    style={{
                      width: `${(recv / count) * 100}%`,
                      background: C.green,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
}
function PersonPage({ visits }) {
  const allVisitors = [
    ...new Set(visits.map((v) => v.visitor)),
  ].sort();

  const [sel, setSel] = useState(allVisitors[0] || "");

  const personVisits = visits
    .filter((v) => v.visitor === sel)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const receivedVisits = visits
    .filter((v) => v.host === sel)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const groupedMade = personVisits.reduce((acc, v) => {
    if (!acc[v.host]) acc[v.host] = [];

    acc[v.host].push(v);

    return acc;
  }, {});

  const groupedReceived = receivedVisits.reduce((acc, v) => {
    if (!acc[v.visitor]) acc[v.visitor] = [];

    acc[v.visitor].push(v);

    return acc;
  }, {});

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "14px 16px 60px",
      }}
    >
      {/* PERSON SELECT */}
      <div style={{ marginBottom: 16 }}>
        <Lab>Select Person</Lab>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 4,
          }}
        >
          {allVisitors.map((name) => (
            <button
              key={name}
              onClick={() => setSel(name)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                background:
                  sel === name ? C.purple : C.border,
                color:
                  sel === name ? "#fff" : C.soft,
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* PROFILE */}
      <div
        style={{
          background: C.purpleLight,
          border: `1px solid ${C.purple}`,
          borderRadius: 14,
          padding: "16px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.purple,
            marginBottom: 3,
          }}
        >
          Member Profile
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          {sel}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "10px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: C.accent,
              }}
            >
              {personVisits.length}
            </div>

            <div
              style={{
                fontSize: 11,
                color: C.soft,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Visits Made
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "10px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: C.green,
              }}
            >
              {receivedVisits.length}
            </div>

            <div
              style={{
                fontSize: 11,
                color: C.soft,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Visits Received
            </div>
          </div>
        </div>
      </div>

      {/* VISITS MADE */}
      <Section
        title={`↑ Visits Made by ${sel}`}
        sub={`${personVisits.length} total`}
      >
        {personVisits.length === 0 ? (
          <NoData />
        ) : (
          Object.entries(groupedMade).map(([host, visits]) => (
            <div
              key={host}
              style={{
                padding: "12px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                → {host}
              </div>

              {visits.map((v) => (
                <div
                  key={v.id}
                  style={{
                    fontSize: 13,
                    color: C.soft,
                    marginBottom: 5,
                    paddingLeft: 14,
                  }}
                >
                  • {fmtDate(v.date)}
                </div>
              ))}
            </div>
          ))
        )}
      </Section>

      {/* VISITS RECEIVED */}
      <Section
        title={`↓ Visits Received by ${sel}`}
        sub={`${receivedVisits.length} total`}
      >
        {receivedVisits.length === 0 ? (
          <NoData />
        ) : (
          Object.entries(groupedReceived).map(
            ([visitor, visits]) => (
              <div
                key={visitor}
                style={{
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 8,
                  }}
                >
                  ← {visitor}
                </div>

                {visits.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      fontSize: 13,
                      color: C.soft,
                      marginBottom: 5,
                      paddingLeft: 14,
                    }}
                  >
                    • {fmtDate(v.date)}
                  </div>
                ))}
              </div>
            )
          )
        )}
      </Section>
    </div>
  );
}
// ───────────────── HELPERS ─────────────────

function Lab({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: C.soft,
        marginBottom: 3,
      }}
    >
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 11px",
        borderRadius: 20,
        border: "none",
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        background: active ? C.accent : C.border,
        color: active ? "#fff" : C.soft,
      }}
    >
      {children}
    </button>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "12px 8px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: 10,
          color: C.soft,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}
function Section({ title, sub, children }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "14px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 15,
          marginBottom: 2,
        }}
      >
        {title}
      </div>

      {sub && (
        <div
          style={{
            fontSize: 12,
            color: C.soft,
            marginBottom: 10,
          }}
        >
          {sub}
        </div>
      )}

      {children}
    </div>
  );
}

function Bar({ pct, color, height = 7 }) {
  return (
    <div
      style={{
        background: C.border,
        borderRadius: 4,
        height,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.max(pct, 2)}%`,
          height: "100%",
          background: color,
          borderRadius: 4,
          transition: "width 0.5s",
        }}
      />
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        color: C.soft,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 2,
          background: color,
        }}
      />

      {label}
    </div>
  );
}

function NoData() {
  return (
    <div
      style={{
        color: C.soft,
        fontSize: 13,
        padding: "8px 0",
      }}
    >
      No data yet.
    </div>
  );
}
