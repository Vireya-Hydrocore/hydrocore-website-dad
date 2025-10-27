import { FaChartLine, FaUsers, FaTasks, FaRobot, FaBullhorn, FaBoxOpen, FaMale } from "react-icons/fa";
import { type JSX } from "react";
import { Link } from "react-router-dom";
import "../../styles/sidebar.css";

type MenuItem = {
  path: string;
  icon: JSX.Element;
  label: string;
};

const menuItems: MenuItem[] = [
  { path: "/dashboard", icon: <FaChartLine />, label: "Dashboards" },
  { path: "/organograma", icon: <FaUsers />, label: "Organograma" },
  { path: "/tarefas", icon: <FaTasks />, label: "Tarefas" },
  { path: "/avisos", icon: <FaBullhorn />, label: "Avisos Diários" },
  { path: "/produtos", icon: <FaBoxOpen />, label: "Produtos" },
  { path: "/funcionarios", icon: <FaMale />, label: "Funcionários" },
  { path: "/chatBot", icon: <FaRobot />, label: "ChatBot" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      {menuItems.map(({ path, icon, label }, index) => (
        <Link key={index} to={path}>
          <div className="menu-item">
            <div className="menu-icon">{icon}</div>
            <span>{label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
