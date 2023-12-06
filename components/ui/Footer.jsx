import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-4 py-6 bg-red-700 shadow">
      <div className="container mx-auto flex items-center justify-center flex-wrap">
        <p className="text-sm text-white">
          © Popcorn Time. All rights reserved.
        </p>
        <a
          href="https://www.github.com/jiarenlim"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white ml-2"
        >
          <Github size={24} />
        </a>
      </div>
    </footer>
  );
}
