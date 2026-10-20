import { useState } from "react";
import {
  FiActivity,
  FiArrowDownRight,
  FiArrowUpRight,
  FiBox,
  FiChevronDown,
  FiChevronRight,
  FiDollarSign,
  FiMoreHorizontal,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";

type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  change: string;
  note: string;
  icon: typeof FiBox;
  positive?: boolean;
};

const wasteTrend = [
  { label: "Oct 01", value: 12.2 },
  { label: "Week 1 (Oct 07)", value: 14.8 },
  { label: "Week 2 (Oct 14)", value: 18.2 },
  { label: "Oct 19 (Prep Spike)", value: 22.1 },
  { label: "Week 3 (Oct 21)", value: 16.8 },
  { label: "Week 4 (Oct 28)", value: 20.8 },
  { label: "Yesterday", value: 15.1 },
];

const departments = [
  { name: "Prepared Entrees", share: 42, revenue: "$60.1k", waste: 18 },
  { name: "Sides & Fries", share: 24, revenue: "$34.3k", waste: 8 },
  { name: "Bakery & Buns", share: 15, revenue: "$21.4k", waste: 26 },
  { name: "Fresh Produce", share: 11, revenue: "$15.7k", waste: 34 },
  { name: "Dairy & Sauces", share: 8, revenue: "$11.4k", waste: 14 },
];

const recommendations = [
  { name: "Brioche Buns", category: "Bakery & Buns", amount: "48 pcs", cost: "$67.20", action: "Reduce Prep -15%" },
  { name: "Romaine Hearts", category: "Fresh Produce", amount: "18.5 kg", cost: "$92.50", action: "Audit Cool Room #2" },
  { name: "Grilled Chicken Patties", category: "Prepared Entrees", amount: "24 units", cost: "$84.00", action: "Shift Hold Times" },
  { name: "Chipotle Mayo Sauce", category: "Dairy & Sauces", amount: "6.2 kg", cost: "$31.00", action: "Batch Size 50%" },
];

function MetricCard({
  label,
  value,
  unit,
  change,
  note,
  icon: Icon,
  positive = true,
}: MetricCardProps) {
  return (
    <article className="min-w-0 rounded-[10px] border border-[#e8ede9] bg-white p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-2 text-[11px] text-[#66716a]">
        <span>{label}</span>
        <span className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-md bg-[#edf5ee] text-[#307d40]" aria-hidden="true">
          <Icon size={15} />
        </span>
      </div>
      <div className="my-[13px] whitespace-nowrap text-[clamp(20px,2vw,27px)] font-bold leading-none tracking-[-0.045em] text-[#202923]">
        {value}
        {unit && <span className="ml-1 text-[11px] font-medium tracking-normal text-[#78827b]">{unit}</span>}
      </div>
      <div className="flex items-start justify-start gap-1.5 text-[9px] text-[#8a938d]">
        <span className={`inline-flex shrink-0 items-center gap-0.5 rounded px-1 py-[3px] text-[9px] font-bold ${positive ? "bg-[#edf7ef] text-[#28783d]" : "bg-[#fff0ee] text-[#c33b36]"}`}>
          {positive ? <FiArrowDownRight className="h-[10px] w-[10px]" /> : <FiArrowUpRight className="h-[10px] w-[10px]" />}
          {change}
        </span>
        <span>{note}</span>
      </div>
    </article>
  );
}

function WasteTrendChart({ showCost }: { showCost: boolean }) {
  const values = showCost
    ? [122, 148, 182, 228, 168, 208, 151]
    : wasteTrend.map((point) => point.value);
  const max = showCost ? 250 : 25;
  const min = showCost ? 100 : 10;
  const points = values.map((value, index) => ({
    x: 34 + index * 112,
    y: 166 - ((value - min) / (max - min)) * 118,
  }));
  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const area = `${line} L ${points[points.length - 1].x} 178 L ${points[0].x} 178 Z`;

  return (
    <div className="relative mt-[15px] pl-[35px]">
      <div className="absolute inset-y-[9px] bottom-[31px] left-0 flex flex-col justify-between text-[8px] text-[#8b948d]" aria-hidden="true">
        <span>{showCost ? "$250" : "25 kg"}</span>
        <span>{showCost ? "$200" : "20 kg"}</span>
        <span>{showCost ? "$150" : "15 kg"}</span>
        <span>{showCost ? "$100" : "10 kg"}</span>
      </div>
      <svg
        className="block h-[clamp(140px,20vw,205px)] w-full overflow-visible"
        viewBox="0 0 740 205"
        role="img"
        aria-label={`Seven point ${showCost ? "estimated waste cost" : "logged waste weight"} trend`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waste-area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#24823b" stopOpacity=".17" />
            <stop offset="100%" stopColor="#24823b" stopOpacity=".015" />
          </linearGradient>
        </defs>
        {[48, 88, 128, 168].map((y) => (
          <line key={y} x1="24" x2="722" y1={y} y2={y} className="stroke-[#e9eeea] [stroke-dasharray:2_4] [stroke-width:1]" />
        ))}
        <line x1="24" x2="722" y1="88" y2="88" className="stroke-[#ec8a83] [stroke-dasharray:4_4] [stroke-width:1]" />
        <path d={area} fill="url(#waste-area-fill)" />
        <path d={line} fill="none" className="stroke-[#27813a] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.5] [vector-effect:non-scaling-stroke]" />
        {points.map((point, index) => (
          <circle
            key={point.x}
            cx={point.x}
            cy={point.y}
            r={index === 3 ? 5 : 4}
            className={`stroke-white [stroke-width:2] [vector-effect:non-scaling-stroke] ${index === 3 ? "fill-[#cf3636]" : "fill-[#27813a]"}`}
          />
        ))}
        <g>
          <rect x={points[3].x - 56} y={points[3].y - 37} width="112" height="25" rx="6" className="fill-white stroke-[#e6ebe7] [filter:drop-shadow(0_2px_5px_rgb(31_45_36_/_15%))]" />
          <circle cx={points[3].x - 45} cy={points[3].y - 24} r="3" className="fill-[#cf3636]" />
          <text x={points[3].x - 37} y={points[3].y - 21} className="fill-[#67716a] text-[7px]">Oct 19 · Highest waste</text>
          <text x={points[3].x - 45} y={points[3].y - 11} className="fill-[#28322b] text-[7px] font-bold">
            {showCost ? "$228.00 loss" : "22.8 kg ($182.40 loss)"}
          </text>
        </g>
      </svg>
      <div className="mt-0.5 grid grid-cols-7 text-center text-[8px] text-[#808a83]">
        {wasteTrend.map((point, index) => (
          <span className={index === 3 ? "font-semibold text-[#bd3632]" : ""} key={point.label}>
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Overview() {
  const [showCost, setShowCost] = useState(false);
  const [period, setPeriod] = useState("Last 30 Days");
  const reviewRecommendations = () => {
    document.getElementById("mitigation-alerts")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex min-w-0 flex-col gap-4 text-[#202923]">
      <div className="flex flex-col items-start justify-between gap-3 min-[901px]:flex-row min-[901px]:items-center">
        <div>
          <p className="mb-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#758078]">Operations overview</p>
          <h1 className="text-[22px] font-bold leading-[1.15] tracking-[-0.04em]">Dashboard</h1>
          <p className="mt-1 text-xs text-[#7a847d]">Live overview &amp; waste diversion metrics</p>
        </div>
        <div className="flex flex-wrap items-center gap-[9px]">
          <span className="inline-flex min-h-[34px] items-center gap-[7px] whitespace-nowrap rounded-lg border border-[#d7ebd9] bg-[#eff8f0] px-[11px] text-[11px] font-semibold text-[#27753a]">
            <FiActivity /> Sample data
          </span>
          <label className="relative inline-flex min-h-[34px] items-center whitespace-nowrap rounded-lg border border-[#e2e9e3] bg-white px-[11px] text-[11px] text-[#49534c]">
            <span className="sr-only">Dashboard date range</span>
            <select className="cursor-pointer appearance-none border-0 bg-transparent pr-[15px] font-inherit outline-none" value={period} onChange={(event) => setPeriod(event.target.value)}>
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Today</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-[9px]" aria-hidden="true" />
          </label>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-2.5 min-[1101px]:grid-cols-4 min-[1101px]:gap-3" aria-label="Key metrics">
        <MetricCard label="Total Waste" value="428.4" unit="kg" change="14.2%" note="vs last month (target met)" icon={FiBox} />
        <MetricCard label="Total Sales Revenue" value="$142,850" change="8.6%" note="vs last month" icon={FiDollarSign} />
        <MetricCard label="Active Menu Items" value="64" unit="items" change="+3" note="seasonal items launched" icon={FiTrendingUp} />
        <MetricCard label="Inventory Items" value="1,280" unit="units" change="98.4%" note="logged & audited" icon={FiPackage} />
      </section>

      <section className="rounded-[10px] border border-[#e8ede9] bg-white p-[13px] sm:p-[17px]" aria-label="Waste trend">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[13px] font-bold tracking-[-0.015em] text-[#27312a]">
              Waste Over Time <span className="text-[11px] font-medium text-[#737e76]">({period})</span>
            </h2>
            <p className="mt-1 text-[10px] leading-[1.5] text-[#89928b]">Continuous trajectory tracking kitchen prep and post-consumer discards</p>
          </div>
          <div className="flex shrink-0 rounded-md bg-[#f1f4f1] p-[3px]" role="group" aria-label="Chart measure">
            <button type="button" aria-pressed={!showCost} className={`rounded px-[9px] py-1.5 text-[9px] ${!showCost ? "bg-[#2e803e] font-semibold text-white" : "text-[#6b756e]"}`} onClick={() => setShowCost(false)}>
              Weight (kg)
            </button>
            <button type="button" aria-pressed={showCost} className={`rounded px-[9px] py-1.5 text-[9px] ${showCost ? "bg-[#2e803e] font-semibold text-white" : "text-[#6b756e]"}`} onClick={() => setShowCost(true)}>
              Cost Impact ($)
            </button>
          </div>
        </div>
        <WasteTrendChart showCost={showCost} />
        <div className="mt-[14px] flex flex-col gap-3 border-t border-[#edf0ed] pt-3 min-[901px]:flex-row min-[901px]:items-center min-[901px]:justify-between">
          <div className="flex flex-wrap items-center justify-start gap-3 text-[9px] text-[#66716a]">
            <span className="inline-flex items-center gap-[5px]"><i className="inline-block h-[7px] w-[7px] rounded-full bg-[#2e803e]" />Actual Logged ({showCost ? "$" : "kg"})</span>
            <span className="inline-flex items-center gap-[5px]"><i className="inline-block w-[10px] border-t-2 border-dashed border-[#e47770]" />Threshold Ceiling</span>
          </div>
          <p className="text-[9px] text-[#7a847d]">
            Average daily discard: <strong className="text-[#39443c]">14.28 kg/day</strong>
            <span className="mx-[5px] text-[#bbc2bc]">·</span>
            Diversion efficiency: <strong className="text-[#27813a]">89.4%</strong>
          </p>
        </div>
      </section>

      <div className="grid min-w-0 grid-cols-1 gap-3.5 min-[1101px]:grid-cols-2">
        <section className="flex min-w-0 flex-col rounded-[10px] border border-[#e8ede9] bg-white p-[13px] sm:p-[17px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[13px] font-bold tracking-[-0.015em] text-[#27312a]">Sales by Category &amp; Waste Ratio</h2>
              <p className="mt-1 text-[10px] leading-[1.5] text-[#89928b]">Comparison between total revenue contribution vs generated waste percentage</p>
            </div>
            <button className="flex h-[26px] w-[26px] items-center justify-center text-[#77817a]" type="button" aria-label="More category options">
              <FiMoreHorizontal />
            </button>
          </div>
          <div className="my-[17px] flex flex-1 flex-col gap-[13px]">
            {departments.map((department) => (
              <div key={department.name}>
                <div className="mb-[5px] flex flex-col items-start justify-between gap-[3px] text-[9px] min-[1101px]:flex-row min-[1101px]:items-center min-[1101px]:gap-2">
                  <strong className="text-[10px] text-[#374139]">{department.name}</strong>
                  <span className="text-left text-[#79837c] min-[1101px]:text-right">
                    Sales: <b className="font-semibold text-[#424e45]">{department.share}% ({department.revenue})</b>
                    <span className="mx-[5px] text-[#bbc2bc]">·</span>
                    Waste: <b className={`font-semibold ${department.waste >= 25 ? "text-[#c63836]" : "text-[#27813a]"}`}>{department.waste}%{department.waste >= 25 ? " (High)" : ""}</b>
                  </span>
                </div>
                <div className="flex h-[7px] w-full overflow-hidden rounded-[5px] bg-[#e9eeea]" aria-label={`${department.name}: ${department.share}% sales share, ${department.waste}% waste`}>
                  <span className="block bg-[#2e803e]" style={{ width: `${department.share}%` }} />
                  <i className="block bg-[#d95050]" style={{ width: `${department.waste}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#edf0ed] pt-[11px]">
            <div className="flex flex-wrap items-center justify-start gap-3 text-[9px] text-[#66716a]">
              <span className="inline-flex items-center gap-[5px]"><i className="inline-block h-[7px] w-[7px] rounded-full bg-[#2e803e]" />Sales Share %</span>
              <span className="inline-flex items-center gap-[5px]"><i className="inline-block h-[7px] w-[7px] rounded-full bg-[#c63535]" />Waste Overhang %</span>
            </div>
            <button type="button" className="whitespace-nowrap text-[9px] font-semibold text-[#28783d]">
              Detailed Breakdown <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <section className="flex min-w-0 flex-col rounded-[10px] border border-[#e8ede9] bg-white p-[13px] sm:p-[17px]" id="mitigation-alerts">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-1.5 text-[13px] font-bold tracking-[-0.015em] text-[#27312a]">
                <FiActivity className="text-[#308147]" /> AI Waste Mitigation Alerts
              </h2>
              <p className="mt-1 text-[10px] leading-[1.5] text-[#89928b]">Immediate AI recommendations to prevent recurring inventory shrinkage.</p>
            </div>
            <span className="shrink-0 rounded bg-[#eef7ed] px-1.5 py-1 text-[9px] font-semibold text-[#2d7b3d]">3 Priority</span>
          </div>
          <div className="mt-[13px]">
            <div className="grid grid-cols-[minmax(78px,1.3fr)_minmax(38px,.6fr)_minmax(40px,.6fr)_minmax(76px,.9fr)] items-center gap-1 border-b border-[#edf0ed] pb-[7px] text-[8px] text-[#808a83] sm:grid-cols-[minmax(95px,1.4fr)_minmax(43px,.7fr)_minmax(45px,.6fr)_minmax(88px,1fr)] sm:gap-[7px]">
              <span>Item &amp; Category</span><span className="text-right">Lost (Qty)</span><span className="text-right">Cost</span><span className="text-right">Recommended Action</span>
            </div>
            {recommendations.map((item) => (
              <div className="grid min-h-[43px] grid-cols-[minmax(78px,1.3fr)_minmax(38px,.6fr)_minmax(40px,.6fr)_minmax(76px,.9fr)] items-center gap-1 border-b border-[#f0f2f0] text-[8px] text-[#4c574f] sm:grid-cols-[minmax(95px,1.4fr)_minmax(43px,.7fr)_minmax(45px,.6fr)_minmax(88px,1fr)] sm:gap-[7px] sm:text-[9px]" key={item.name}>
                <div className="min-w-0">
                  <strong className="block text-[9px] leading-[1.3] text-[#344037]">{item.name}</strong>
                  <small className="mt-0.5 block text-[8px] text-[#89928b]">{item.category}</small>
                </div>
                <span className="text-right">{item.amount}</span>
                <strong className="text-right text-[#c63836]">{item.cost}</strong>
                <span className="justify-self-end rounded bg-[#edf7ef] px-[5px] py-1 text-center text-[8px] text-[#28783d]">{item.action}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <p className="text-[9px] text-[#7c867e]">Est. Weekly Savings:<strong className="mt-0.5 block text-[11px] text-[#27813a]">+$274.70</strong></p>
            <button type="button" className="inline-flex min-h-8 items-center justify-center gap-[5px] rounded-md border border-[#dce7de] bg-white px-[9px] text-[9px] font-semibold text-[#28783d] hover:bg-[#f2f8f3]" onClick={reviewRecommendations}>
              <FiChevronRight />
              Review Recommendations
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Overview;
