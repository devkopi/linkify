import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Importamos QRCodeCanvas
import { FaInfoCircle } from 'react-icons/fa';

function QRGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [generatedQRCode, setGeneratedQRCode] = useState(null);

  const handleGenerateQRCode = () => {
    if (inputValue.trim()) {
      setGeneratedQRCode(inputValue);
    }
  };

  const handleClearQRCode = () => {
    setInputValue(''); // Limpiar el campo de entrada
    setGeneratedQRCode(null); // Limpiar el código QR generado
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-16">
      <div className="w-full max-w-5xl space-y-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Generador de Código QR</h2>
        
        {/* Espacio para ingresar el texto */}
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingresa el texto o enlace aquí..."
            className="border border-gray-300 p-3 rounded-lg mb-4 w-full max-w-md"
          />
          <button
            onClick={handleGenerateQRCode}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Generar QR Code
          </button>
        </div>

        {/* Mostrar el código QR generado */}
        {generatedQRCode && (
          <div className="flex flex-col items-center mt-6">
            <QRCodeCanvas value={generatedQRCode} size={256} className="mb-4" />
            <p className="text-gray-700 text-lg mb-2">Código QR generado para:</p>
            <p className="text-gray-600 text-center">{generatedQRCode}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => {
                  const canvas = document.getElementsByTagName('canvas')[0];
                  const pngUrl = canvas.toDataURL('image/png');
                  const link = document.createElement('a');
                  link.href = pngUrl;
                  link.download = 'codigo_qr.png';
                  link.click();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
                Descargar QR Code
              </button>
              {/* Botón para limpiar el código QR solo visible si se ha generado */}
              <button
                onClick={handleClearQRCode}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Limpiar QR Code
              </button>
            </div>
          </div>
        )}
        
        {/* Información adicional */}
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center justify-center space-x-2">
            <FaInfoCircle className="text-blue-600" />
            <span>Información Adicional</span>
          </h3>
          <p className="text-gray-600 mb-2">
            - Puedes generar un código QR para cualquier enlace o texto que desees compartir.
          </p>
          <p className="text-gray-600 mb-2">
            - Asegúrate de que el texto no sea demasiado largo para una mejor legibilidad.
          </p>
          <p className="text-gray-600">
            - Haz clic en "Descargar QR Code" para guardar tu código en formato PNG.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QRGenerator;
