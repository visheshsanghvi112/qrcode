import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
