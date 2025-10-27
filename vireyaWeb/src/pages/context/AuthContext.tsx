import { createContext, useContext, useState, useEffect } from "react";

interface AuthData {
  funcionarioId: string | null;
  nome: string | null;
  cargo: string | null;
  login: (id: string, nome: string, cargo: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [funcionarioId, setFuncionarioId] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [cargo, setCargo] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem("funcionarioId");
    const savedNome = localStorage.getItem("nomeFuncionario");
    const savedCargo = localStorage.getItem("cargoFuncionario");

    if (savedId) {
      setFuncionarioId(savedId);
      setNome(savedNome);
      setCargo(savedCargo);
    }
  }, []);

  const login = (id: string, nome: string, cargo: string) => {
    localStorage.setItem("funcionarioId", id);
    localStorage.setItem("nomeFuncionario", nome);
    localStorage.setItem("cargoFuncionario", cargo);

    setFuncionarioId(id);
    setNome(nome);
    setCargo(cargo);
  };

  const logout = () => {
    localStorage.clear();
    setFuncionarioId(null);
    setNome(null);
    setCargo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        funcionarioId,
        nome,
        cargo,
        login,
        logout,
        isAuthenticated: !!funcionarioId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
