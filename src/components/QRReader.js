import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import jsQR from 'jsqr';
import { FaCamera, FaInfoCircle } from 'react-icons/fa';

function QRReader() {
  const [isScanning, setIsScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('scanHistory');
    if (storedHistory) {
      setScanHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('scanHistory', JSON.stringify(scanHistory));
  }, [scanHistory]);

  const handleScan = (data) => {
    if (data) {
      setQrData(data.text);
      setScanHistory((prevHistory) => [...prevHistory, data.text]);
      setIsScanning(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleScanToggle = () => {
    setIsScanning(!isScanning);
    setQrData(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            setImageResult(code.data); // Muestra el resultado real
            setImageError(null);
          } else {
            setImageError('No se pudo detectar ningún código QR en la imagen.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileClear = () => {
    setFile(null);
    setImageResult(null);
    setImageError(null);
    document.getElementById('fileInput').value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Sección de Escaneo por Cámara */}
      <div className="w-full max-w-5xl space-y-8 mb-16 mt-32">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Escaneo Mediante la Cámara</h2>
        <div className="flex flex-row space-x-8">
          {/* Tarjeta de Información sobre Permiso de Cámara */}
          <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg text-center h-96">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-center space-x-2">
              <FaInfoCircle className="text-blue-600" />
              <span>Permiso de Cámara</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Para escanear el código QR mediante la cámara, este sitio necesita permiso para acceder a la cámara de tu dispositivo.
            </p>
            <p className="text-gray-600 mb-2">
              1. Asegúrate de permitir el acceso a la cámara cuando el navegador lo solicite.
            </p>
            <p className="text-gray-600 mb-2">
              2. Coloca el código QR frente a la cámara en un ambiente bien iluminado.
            </p>
            <p className="text-gray-600">
              3. Mantén el código QR estable para una captura más rápida y precisa.
            </p>
            <p className="text-gray-600 mt-4 font-semibold">
              Nota: Si el acceso a la cámara está bloqueado, revisa la configuración de permisos de tu navegador.
            </p>
          </div>

          {/* Tarjeta de Escaneo con Cámara */}
          <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg text-center h-96">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-center space-x-2">
              <FaCamera className="text-blue-600" />
              <span>Escanear con Cámara</span>
            </h3>
            <button
              onClick={handleScanToggle}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Iniciar Escaneo
            </button>
            <p className="text-gray-600 mt-4">
              Presiona “Iniciar Escaneo” y apunta la cámara hacia el código QR hasta que el contenido sea detectado.
            </p>
            <p className="text-gray-600 mt-4">
              La cámara intentará automáticamente capturar el código. Si el QR no se detecta, intenta ajustar la posición o iluminación.
            </p>
          </div>
        </div>
      </div>

      {/* Mostrar QrScanner solo si isScanning es true */}
      {isScanning && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Escaneando...</h2>
            <div className="border-2 border-blue-500 p-2 mb-4">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%', height: 'auto' }} // Ajustamos el tamaño
              />
            </div>
            <button onClick={() => setIsScanning(false)} className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Resultados de Escaneo */}
      {qrData && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Resultado:</h2>
            <p className="text-gray-600">{qrData}</p>
            <button
              onClick={() => setQrData(null)}
              className="mt-2 inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Resultados de Imagen */}
      {imageResult && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Resultado de Imagen:</h2>
            <p className="text-gray-600">{imageResult}</p>
            <button
              onClick={() => setImageResult(null)}
              className="mt-2 inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Sección de Subida de Archivos */}
      <div className="w-full max-w-5xl space-y-8 mb-16 mt-16">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Escaneo Mediante Archivo</h2>
        <div className="flex flex-row space-x-8">
          {/* Tarjeta de Subida de Imagen */}
          <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg text-center h-96">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-center space-x-2">
              <FaCamera className="text-blue-600" />
              <span>Subir Imagen</span>
            </h3>
            <input
              id="fileInput" // Asegúrate de que este ID sea único
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4 mb-4 border border-gray-300 p-2 rounded"
            />
            {file && <p className="text-gray-600">Archivo seleccionado: {file.name}</p>}
            <button
              onClick={handleFileClear}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200"
            >
              Limpiar Archivo
            </button>
            {imageError && (
              <div className="mt-4 p-4 bg-red-200 border border-red-500 rounded-lg shadow-md">
                <p className="text-red-600">{imageError}</p>
              </div>
            )}
            {imageResult && (
              <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-sm mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Resultado de Imagen:</h2>
                <p className="text-gray-600">{imageResult}</p>
                <button
                  onClick={() => setImageResult(null)}
                  className="mt-2 inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>

          {/* Tarjeta de Información sobre Permisos de Archivos */}
          <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg text-center h-96">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-center space-x-2">
              <FaInfoCircle className="text-blue-600" />
              <span>Formato de Archivo</span>
            </h3>
            <p className="text-gray-600 mb-2">
              - Asegúrate de subir imágenes en formatos como PNG, JPG o GIF.
            </p>
            <p className="text-gray-600 mb-2">
              - Los archivos demasiado grandes pueden afectar el rendimiento.
            </p>
            <p className="text-gray-600 mb-2">
              - Puedes usar imágenes desde tu dispositivo o capturas de pantalla.
            </p>
            <p className="text-gray-600">
              - Después de subir, el código QR se procesará y mostrará el resultado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRReader;
