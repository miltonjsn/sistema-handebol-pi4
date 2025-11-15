import { createContext, useState } from "react";

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const aumentarFonte = () => setFontSize(prev => Math.min(prev + 2, 24));
  const diminuirFonte = () => setFontSize(prev => Math.max(prev - 2, 12));

  return (
    <FontContext.Provider value={{ fontSize, aumentarFonte, diminuirFonte }}>
      {children}
    </FontContext.Provider>
  );
};
