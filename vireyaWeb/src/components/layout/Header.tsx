import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "../Tema";
import "../../styles/header.css";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../pages/context/AuthContext";

const Header = () => {
  const { nome, cargo } = useAuth();
  const location = useLocation();

  const [currentDate, setCurrentDate] = useState<string>("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const pageTitles: Record<string, string> = useMemo(
    () => ({
      "/dashboard": "Dashboard",
      "/organograma": "Organograma",
      "/tarefas": "Tarefas",
      "/produtos": "Produtos",
      "/avisos": "Avisos Diários",
      "/funcionarios": "Funcionários",
      "/chatBot": "ChatBot",
      "/acesso-negado": "Acesso Negado",
    }),
    []
  );

  const getPageTitle = () => pageTitles[location.pathname] || "Página não encontrada";

  // Atualiza data e imagem do usuário
  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
    );

    const savedImage = localStorage.getItem("userImage");
    if (savedImage) setUserImage(savedImage);
  }, []);

  // Upload de avatar
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setUserImage(imageUrl);
      localStorage.setItem("userImage", imageUrl);
    };
    reader.readAsDataURL(file);
  };

  // Fallback de imagem
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setUserImage("/assets/default-avatar.svg");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="user-info">
          <div className="user-avatar-container">
            <img
              src={userImage || "/assets/default-avatar.svg"}
              alt="Avatar do usuário"
              className="user-avatar"
              onError={handleImageError}
            />
            <input
              type="file"
              id="uploadImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="uploadImage" className="upload-image-label">
              <FaEdit />
            </label>
          </div>
          <div className="headerUserInfo">
            <p className="user-name">{nome || "Nome indisponível"}</p>
            <p className="user-role">{cargo || "Cargo indisponível"}</p>
          </div>
        </div>
      </div>

      <div className="pageInfo">
        <h1 className="title">{getPageTitle()}</h1>
        <p className="date">{currentDate}</p>
      </div>

      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
