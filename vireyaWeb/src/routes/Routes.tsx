import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import PrivateRoute from "../pages/PrivateRoute";
import LoginExterno from "../pages/LoginExterno";
import AcessoNegadoPage from "../pages/AcessoNegadoPage";
import { CircularProgress } from "@mui/material";

const LoadingFallback = () => <CircularProgress />;

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const OrganogramaPage = lazy(() => import("../pages/OrganogramaPage"));
const ProdutoPage = lazy(() => import("../pages/crud/ProdutoPage"));
const TarefaPage = lazy(() => import("../pages/crud/TarefaPage"));
const ChatBotPage = lazy(() => import("../pages/ChatBotPage"));
const AvisoPage = lazy(() => import("../pages/crud/AvisoPage"));
const FuncionarioPage = lazy(() => import("../pages/crud/FuncionarioPage"));

const RoutesConfig: React.FC = () => (
  <Router>
    <Header />
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login-externo" element={<LoginExterno />} />
            <Route path="/acesso-negado" element={<AcessoNegadoPage />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/organograma"
              element={
                <PrivateRoute>
                  <OrganogramaPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tarefas"
              element={
                <PrivateRoute>
                  <TarefaPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/produtos"
              element={
                <PrivateRoute>
                  <ProdutoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/funcionarios"
              element={
                <PrivateRoute>
                  <FuncionarioPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/avisos"
              element={
                <PrivateRoute>
                  <AvisoPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/chatBot"
              element={
                <PrivateRoute>
                  <ChatBotPage />
                </PrivateRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="*" element={<div>404 - Página não encontrada</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  </Router>
);

export default RoutesConfig;
