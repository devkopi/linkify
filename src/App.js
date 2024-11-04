// src/App.js
import React, { useState } from 'react';
import QRReader from './components/QRReader';
import QRCodeGenerator from './components/QRCodeGenerator';
import { FaCode, FaReact, FaCss3Alt, FaGithub, FaQrcode, FaImage, FaWifi } from 'react-icons/fa';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'qr-reader':
        return <QRReader />;
      case 'qr-generator':
        return <QRCodeGenerator />;
      case 'home':
      default:
        return (
          <div className="flex flex-col items-center p-6 text-gray-800">
            {/* Sección de Bienvenida */}
            <div className="flex flex-col items-center w-full py-20">
              <h1 className="text-6xl font-extrabold mb-4 text-center text-teal-600 animate-fade-in">
                ¡Bienvenido a Linkify!
              </h1>
              <p className="text-xl mb-6 text-center max-w-3xl">
                Linkify es una plataforma innovadora que te permite escanear y generar códigos QR de manera sencilla y rápida.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center bg-[#24292f] text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-[#3b4045]"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
                <button
                  onClick={() => setCurrentTab('qr-reader')}
                  className="bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-teal-700"
                >
                  Escanear Código QR
                </button>
              </div>
            </div>

            {/* Sección de Desarrollo */}
            <div className="flex flex-col items-center w-full py-20">
              <h2 className="text-5xl font-semibold mb-10 text-center text-teal-600">Desarrollo del Proyecto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-6 max-w-5xl">
                <div className="flex flex-col items-center text-center p-6 transition-transform transform hover:scale-105 shadow-lg rounded-lg">
                  <FaCode className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Lenguaje</h3>
                  <p>Desarrollado en <strong>JavaScript</strong>, un lenguaje versátil y ampliamente utilizado en desarrollo web.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 transition-transform transform hover:scale-105 shadow-lg rounded-lg">
                  <FaReact className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Framework</h3>
                  <p>Utilizamos <strong>React</strong>, un framework poderoso que permite construir interfaces de usuario reactivas y dinámicas.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 transition-transform transform hover:scale-105 shadow-lg rounded-lg">
                  <FaCss3Alt className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Estilo</h3>
                  <p>Estilizado con <strong>Tailwind CSS</strong>, permitiendo un diseño moderno y responsivo que se adapta a cualquier dispositivo.</p>
                </div>
              </div>
            </div>

            {/* Sección de Características */}
            <div className="w-full py-20">
              <h2 className="text-5xl font-semibold mb-10 text-center text-teal-600">Características de Linkify</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
                  <FaQrcode className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Escaneo en Tiempo Real</h3>
                  <p>Escanea códigos QR en tiempo real usando la cámara de tu dispositivo.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
                  <FaWifi className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Compatibilidad con WiFi</h3>
                  <p>Detecta y conecta redes WiFi directamente desde un código QR.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
                  <FaImage className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Subida de Imágenes</h3>
                  <p>Carga imágenes de códigos QR desde tu galería para escanearlas fácilmente.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
                  <FaReact className="text-teal-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Generador de QR</h3>
                  <p>Genera tus propios códigos QR personalizados con un solo clic.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-center space-x-4 bg-teal-700 p-4 fixed w-full top-0 z-10 shadow-lg">
        <button 
          onClick={() => setCurrentTab('home')} 
          className="text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-600"
        >
          Inicio
        </button>
        <button 
          onClick={() => setCurrentTab('qr-reader')} 
          className="text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-600"
        >
          Lector de QR
        </button>
        <button 
          onClick={() => setCurrentTab('qr-generator')} 
          className="text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-teal-600"
        >
          Generador de QR
        </button>
      </nav>

      {/* Contenido de la pestaña actual */}
      {renderContent()}

      {/* Footer */}
      <footer className="bg-teal-700 text-white text-center p-4 mt-8">
        <p>© 2024 Linkify. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
