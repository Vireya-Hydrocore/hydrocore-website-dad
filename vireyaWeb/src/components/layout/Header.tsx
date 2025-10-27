import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "../Tema";
import "../../styles/header.css";
import { FaEdit } from "react-icons/fa";
import useGetUserData from "../../hooks/useUsuario";

const Header = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const location = useLocation();

  const email = "joao.santos@email.com";

  // Usar hook que busca nome e cargo pelo email
  const { nome, cargo, loading } = useGetUserData(email);

  const pageTitles: { [key: string]: string } = useMemo(
    () => ({
      "/dashboard": "Dashboard",
      "/organograma": "Organograma",
      "/tarefas": "Tarefas",
      "/produtos": "Produtos",
      "/avisos": "Avisos Diários",
      "/funcionarios": "Funcionários",
      "/chatBot": "ChatBot",
    }),
    []
  );

  const getPageTitle = () => pageTitles[location.pathname] || "Página não encontrada";

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("pt-BR", options));

    const savedImage = localStorage.getItem("userImage");
    if (savedImage) setUserImage(savedImage);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setUserImage(imageUrl);
        localStorage.setItem("userImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="user-info">
          <div className="user-avatar-container">
            <img
              src={userImage || "/assets/default-avatar.jpg"}
              alt="Imagem do usuário"
              className="user-avatar"
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
            {loading ? (
              <p>Carregando usuário...</p>
            ) : (
              <>
                <p className="user-name">{nome || "Nome não disponível"}</p>
                <p className="user-role">{cargo || "Cargo não disponível"}</p>
              </>
            )}
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
