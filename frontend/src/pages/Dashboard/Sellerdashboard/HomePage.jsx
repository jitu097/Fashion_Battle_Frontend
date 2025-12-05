import React , { useState} from 'react'
import './Sellerdashboard.css'
import {
  FaHome,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaBell,
  FaBox,
  FaEnvelope,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const sampleData = [
  { year: "2014", sales: 800, expenses: 200, profit: 100 },
  { year: "2015", sales: 1200, expenses: 400, profit: 200 },
  { year: "2016", sales: 600, expenses: 1100, profit: 300 },
  { year: "2017", sales: 1000, expenses: 500, profit: 250 },
  { year: "2018", sales: 400, expenses: 300, profit: 120 },
  { year: "2019", sales: 700, expenses: 280, profit: 160 },
  { year: "2020", sales: 1300, expenses: 1150, profit: 420 },
  { year: "2021", sales: 1100, expenses: 1050, profit: 300 },
];

const popularProducts = [
  { id: 1, title: "Vintage Denim Jacket", details: "Best seller — 1200 sold" },
  { id: 2, title: "Leather Boots", details: "Seasonal favorite — 980 sold" },
  { id: 3, title: "Retro Sunglasses", details: "High margin — 540 sold" },
  { id: 4, title: "Canvas Tote Bag", details: "Eco friendly — 430 sold" },
];


const HomePage = () => {
    const [expanded, setExpanded] = useState(null);
     
    const toggleAccordion = (id) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <div>
        <div className="top-cards">
            <div className="card card-earnings">
              <div className="card-icon">💳</div>
              <div className="card-body">
                <h3>$500</h3>
                <p>Total Earnings</p>
              </div>
            </div>

            <div className="card card-orders">
              <div className="card-icon">🛒</div>
              <div className="card-body">
                <h3>$900</h3>
                <p>Total Orders</p>
              </div>
            </div>

            <div className="card card-income">
              <div className="card-icon">🏷️</div>
              <div className="card-body">
                <h3>$203k</h3>
                <p>Total Income</p>
              </div>
            </div>
          </div>

          <div className="grid-panel">
            <section className="chart-section">
              <div className="panel-header">
                <h3>Company Performance</h3>
                <small>Sales, Expenses, and Profit: 2014–2021</small>
              </div>

              <div className="chart-wrapper">
                {/* ResponsiveContainer MUST be imported from 'recharts' */}
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={sampleData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" stackId="a" fill="#4a6cf7" />
                    <Bar dataKey="expenses" stackId="a" fill="#6f86d6" />
                    <Bar dataKey="profit" fill="#48c6ef" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <aside className="right-panel">
              <div className="summary-card">
                <h4>$203k</h4>
                <p>Total Income</p>
              </div>

              <div className="products-card">
                <h4>Popular Products</h4>
                {popularProducts.map((p) => (
                  <div
                    key={p.id}
                    className={`accordion ${expanded === p.id ? "open" : ""}`}
                    onClick={() => toggleAccordion(p.id)}
                  >
                    <div className="accordion-head">
                      <strong>{p.title}</strong>
                      <span className="chev">
                        {expanded === p.id ? "▲" : "▼"}
                      </span>
                    </div>
                    <div className="accordion-body">
                      <p>{p.details}</p>
                      <div className="product-actions">
                        <button className="btn small">View</button>
                        <button className="btn small outline">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mini-chart">
                <h4>Monthly Trend</h4>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={sampleData} margin={{ left: 0, right: 0 }}>
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4a6cf7"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </aside>
          </div>
    </div>
  )
}
export default HomePage
