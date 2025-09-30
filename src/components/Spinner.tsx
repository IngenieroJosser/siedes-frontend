"use client";

import { FC } from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "gold" | "orange" | "white";
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ 
  size = "md", 
  color = "gold",
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    primary: "text-[#002930]",
    gold: "text-[#F8F0AF]",
    orange: "text-[#AC4A00]",
    white: "text-white"
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Spinner principal con diseño cultural inspirado */}
      <div className="relative">
        {/* Anillo exterior con gradiente cultural */}
        <div className={`
          ${sizeClasses[size]}
          rounded-full border-2 border-current opacity-20
        `}></div>
        
        {/* Elemento animado principal */}
        <div className={`
          absolute top-0 left-0
          ${sizeClasses[size]}
          rounded-full border-2 border-transparent
          border-t-current border-r-current
          animate-spin
        `} style={{ 
          animationDuration: "1.5s",
          background: "conic-gradient(transparent, transparent, transparent, currentColor)"
        }}></div>
        
        {/* Elemento decorativo interior - inspirado en patrones culturales */}
        <div className={`
          absolute inset-0 m-auto
          ${size === "sm" ? "w-1 h-1" : 
            size === "md" ? "w-2 h-2" :
            size === "lg" ? "w-3 h-3" : "w-4 h-4"}
          rounded-full bg-current
          animate-pulse
        `} style={{ animationDuration: "2s" }}></div>
        
        {/* Partículas decorativas flotantes */}
        {size !== "sm" && (
          <>
            <div className={`
              absolute -top-1 -right-1
              ${size === "md" ? "w-1 h-1" : "w-2 h-2"}
              rounded-full bg-current
              animate-bounce
            `} style={{ animationDelay: "0.1s" }}></div>
            <div className={`
              absolute -bottom-1 -left-1
              ${size === "md" ? "w-1 h-1" : "w-2 h-2"}
              rounded-full bg-current
              animate-bounce
            `} style={{ animationDelay: "0.3s" }}></div>
          </>
        )}
      </div>
    </div>
  );
};

// Spinner alternativo más elaborado con diseño circular complejo
export const CulturalSpinner: FC<SpinnerProps> = ({ 
  size = "md", 
  color = "gold",
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    primary: "text-[#002930]",
    gold: "text-[#F8F0AF]",
    orange: "text-[#AC4A00]",
    white: "text-white"
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Círculos concéntricos animados */}
        <div className={`
          ${sizeClasses[size]}
          rounded-full border-2 border-current border-opacity-10
          animate-spin
        `} style={{ animationDuration: "3s" }}></div>
        
        <div className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${size === "sm" ? "w-3 h-3" : 
            size === "md" ? "w-6 h-6" :
            size === "lg" ? "w-9 h-9" : "w-12 h-12"}
          rounded-full border-2 border-transparent
          border-t-current border-b-current
          animate-spin
        `} style={{ animationDuration: "2s", animationDirection: "reverse" }}></div>
        
        {/* Elemento central con patrón cultural */}
        <div className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${size === "sm" ? "w-1 h-1" : 
            size === "md" ? "w-2 h-2" :
            size === "lg" ? "w-3 h-3" : "w-4 h-4"}
          rounded-full bg-current
          animate-pulse
        `}></div>
      </div>
    </div>
  );
};

// Spinner de carga de página completo
export const PageSpinner: FC<{ message?: string }> = ({ 
  message = "Cargando contenido..." 
}) => {
  return (
    <div className="fixed inset-0 bg-[#002930] bg-opacity-95 z-50 flex flex-col items-center justify-center">
      {/* Spinner principal grande */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-[#F8F0AF] border-opacity-10"></div>
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-transparent border-t-[#F8F0AF] border-r-[#AC4A00] animate-spin"></div>
        
        {/* Elementos decorativos culturales */}
        <div className="absolute -inset-4 rounded-full border border-[#F8F0AF] border-opacity-5 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] animate-bounce"></div>
      </div>

      {/* Texto de carga */}
      <div className="text-center">
        <p className="text-[#F8F0AF] font-medium mb-2">{message}</p>
        
        {/* Barra de progreso decorativa */}
        <div className="w-48 h-1 bg-white bg-opacity-10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#F8F0AF] to-[#AC4A00] rounded-full animate-pulse" style={{
            animationDuration: "1.5s",
            width: "60%"
          }}></div>
        </div>
        
        {/* Elementos decorativos adicionales */}
        <div className="flex justify-center mt-4 space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-[#F8F0AF] animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Spinner para botones y acciones específicas
export const ButtonSpinner: FC<{ variant?: "primary" | "secondary" }> = ({ 
  variant = "primary" 
}) => {
  const colors = variant === "primary" 
    ? "text-white" 
    : "text-[#002930]";

  return (
    <div className={`inline-flex items-center ${colors}`}>
      <div className="w-4 h-4 rounded-full border-2 border-current border-opacity-20"></div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-transparent border-t-current border-l-current animate-spin"></div>
    </div>
  );
};

export default Spinner;