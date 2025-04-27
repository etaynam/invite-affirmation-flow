
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 text-center text-gray-500 text-xs">
      <div className="flex items-center justify-center gap-1">
        <span>נוצר באמצעות</span>
        <img
          src="https://mabrouk.io/assets/logo-Cch7FxU9.png"
          alt="Mabrouk Logo"
          className="h-4"
        />
      </div>
    </footer>
  );
};

export default Footer;
