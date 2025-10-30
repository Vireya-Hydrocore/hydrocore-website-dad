import { createContext, useContext, useState } from "react";

interface AuthData {
  nome: string | null;
  cargo: string | null;
  login: (nome: string, cargo: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [nome, setNome] = useState<string | null>(null);
  const [cargo, setCargo] = useState<string | null>(null);

  const login = (nome: string, cargo: string) => {
    setNome(nome);
    setCargo(cargo);
  };

  const logout = () => {
    setNome(null);
    setCargo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        nome,
        cargo,
        login,
        logout,
        isAuthenticated: !!nome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => useContext(AuthContext);
