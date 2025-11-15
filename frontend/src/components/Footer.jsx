import { useContext } from 'react';
import { FontContext } from '../context/FontContext';

export default function Footer() {
  const { fontSize } = useContext(FontContext);

  return (
    <footer className="bg-gray-800 text-white p-4 mt-4" style={{ fontSize: fontSize + 'px' }}>
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Sistema Handebol. Todos os direitos reservados.
      </div>
    </footer>
  );
}
