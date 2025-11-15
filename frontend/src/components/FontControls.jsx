import { useContext } from "react";
import { FontContext } from "../context/FontContext";

export default function FontControls() {
  const { aumentarFonte, diminuirFonte } = useContext(FontContext);
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={aumentarFonte}
        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
      >
        A+
      </button>
      <button
        onClick={diminuirFonte}
        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
      >
        A-
      </button>
    </div>
  );
}
