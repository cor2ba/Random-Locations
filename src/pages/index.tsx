import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Geist } from "next/font/google";
import { GoogleMap, LoadScript, Marker, useLoadScript, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places', 'streetView'];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const HomePage = () => {
  const [coordinates, setCoordinates] = useState<Array<{lat: number, lng: number}>>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showAllLocations, setShowAllLocations] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  const generateRandomCoordinates = () => {
    const newCoordinates = [];
    for (let i = 0; i < quantity; i++) {
      const lat = Math.random() * 170 - 85;
      const lng = Math.random() * 360 - 180;
      newCoordinates.push({
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6))
      });
    }
    setCoordinates(newCoordinates);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={libraries}>
      <div className={`h-screen overflow-hidden bg-[#0A0F1C] relative ${geistSans.variable} font-sans`}>
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(17,24,39,0.8),rgba(0,0,0,0)_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_35%)] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1),transparent_35%)] animate-pulse" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-screen max-w-4xl mx-auto p-8 text-white flex flex-col"
        >
          {/* Header mejorado */}
          <div className="text-center space-y-6 mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
              Random Location
            </motion.h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explora el mundo de manera aleatoria. Genera coordenadas únicas y descubre 
              lugares inexplorados en cualquier rincón del planeta.
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-12">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 px-4 py-3 h-full bg-gray-900/50 border border-gray-700 rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                placeholder="№"
              />
              <span className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-500">
                Ubicaciones
              </span>
            </div>
            <button
              onClick={generateRandomCoordinates}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              Generar Ubicaciones
            </button>
            {coordinates.length > 0 && (
              <button
                onClick={() => setShowAllLocations(true)}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Ver Todas las Ubicaciones
              </button>
            )}
          </div>

          {coordinates.length > 0 && (
            <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
              <div className="grid gap-4">
                {coordinates.map((coord, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.645, 0.045, 0.355, 1]
                    }}
                    className="group p-4 bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-500/10 rounded-lg text-blue-400 font-medium">
                        {index + 1}
                      </span>
                      <span className="font-mono text-gray-400 group-hover:text-gray-300 transition-colors">
                        {coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(coord)}
                      className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
                    >
                      Ver en Mapa
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {selectedLocation && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setSelectedLocation(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="fixed inset-0 w-full h-full bg-gray-900/95 z-50"
              >
                <div className="h-full p-6 flex flex-col max-w-7xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white">
                        Ubicación Encontrada
                      </h3>
                      <p className="text-gray-400 font-mono">
                        {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
                    <GoogleMap
                      mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                      center={selectedLocation}
                      zoom={8}
                      options={{
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: false,
                        fullscreenControl: true,
                        minZoom: 2,
                        maxZoom: 18,
                        restriction: {
                          latLngBounds: {
                            north: 85,
                            south: -85,
                            west: -180,
                            east: 180,
                          },
                          strictBounds: true
                        },
                        styles: [
                          {
                            featureType: "all",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#ffffff" }]
                          }
                        ]
                      }}
                    >
                      <Marker position={selectedLocation} />
                    </GoogleMap>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <a
                      href={`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <span>Abrir en Google Maps</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
          {showAllLocations && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setShowAllLocations(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="fixed inset-0 w-full h-full bg-gray-900/95 z-50"
              >
                <div className="h-full p-6 flex flex-col max-w-7xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white">
                        Todas las Ubicaciones
                      </h3>
                      <p className="text-gray-400">
                        {coordinates.length} ubicaciones encontradas
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAllLocations(false)}
                      className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
                    <GoogleMap
                      mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                      center={coordinates[0]}
                      zoom={2}
                      options={{
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: false,
                        fullscreenControl: true,
                        minZoom: 2,
                        maxZoom: 18,
                        restriction: {
                          latLngBounds: {
                            north: 85,
                            south: -85,
                            west: -180,
                            east: 180,
                          },
                          strictBounds: true
                        }
                      }}
                    >
                      {coordinates.map((coord, index) => (
                        <Marker
                          key={index}
                          position={coord}
                          label={{
                            text: `${index + 1}`,
                            color: 'white',
                            className: 'font-bold'
                          }}
                        />
                      ))}
                    </GoogleMap>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </LoadScript>
  );
};

export default HomePage;
