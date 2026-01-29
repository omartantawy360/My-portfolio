import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-8"
      style={{ opacity: 0.95 }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400">© 2025 Omar Tantawy. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">
            Front-End Developer | Creating amazing web experiences
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
