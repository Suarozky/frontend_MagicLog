"use client";

import { useState, useEffect } from "react";
import { FiChevronLeft, FiShoppingCart, FiCreditCard } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProductView() {
  

  const [selectedImage] = useState("/product/zapato2.svg");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full  bg-gradient-to-b from-blue-50 to-white py-1  rounded-xl scale-125">
      {/* Barra de navegación */}
      <div className="w-full px-4 py-5 bg-white shadow-sm rounded-t-xl mb-2 ">
        <a
          href="/store"
          className="flex items-center gap-1 text-blue-600 text-xs hover:text-blue-800 transition-colors"
        >
          <FiChevronLeft className="text-base" />
          <span className="font-medium">VOLVER</span>
        </a>
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-3 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Columna izquierda - Imágenes */}
          <div className="flex-1">
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow mb-4"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              {isLoading ? (
                <div className="w-full h-72 lg:h-80 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <img
                  src={selectedImage}
                  alt="Imagen de Producto"
                  className="w-full h-72 lg:h-80 object-contain p-3"
                />
              )}
            </motion.div>
          </div>

          {/* Columna derecha - Detalles */}
          <div className="flex-1">
            <motion.div
              className="bg-white rounded-2xl shadow p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Encabezado */}
              <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-800">OTOPLASTIA</h1>
                <p className="text-xs text-gray-500 mt-1">Cirugía General</p>
              </div>

              {/* Precio */}
              <div className="mb-5 bg-blue-50 p-3 rounded-lg">
                <div className="flex items-baseline flex-wrap">
                  <span className="text-lg font-semibold text-blue-700 mr-2">
                    Cuotas de $200
                  </span>
                  <span className="text-xs text-gray-500">
                    (Valor Total $4000)
                  </span>
                </div>
                <div className="w-full h-1 bg-blue-200 my-3 rounded-full"></div>
              </div>

              {/* Términos */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-1">
                  TÉRMINOS Y CONDICIONES
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Este procedimiento incluye consulta previa, materiales
                  quirúrgicos y una sesión de seguimiento post-operatorio. El
                  pago inicial debe realizarse con al menos 48 horas de
                  anticipación a la fecha programada. Aplican restricciones
                  médicas según evaluación previa.
                </p>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-4 bg-white border-2 border-blue-600 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-50"
                >
                  <FiShoppingCart className="text-blue-600 text-sm" />
                  <span className="text-sm font-bold text-blue-600">
                    AÑADIR AL CARRITO
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-4 bg-blue-600 border-2 border-blue-600 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700"
                >
                  <FiCreditCard className="text-white text-sm" />
                  <span className="text-sm font-bold text-white">
                    PAGAR AHORA
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
