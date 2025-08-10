import React from 'react';

export default function About() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">About QR SaaS</h1>
      <p className="text-lg text-gray-700 mb-6">QR SaaS is a modern, privacy-friendly QR code generator built for everyone. We believe in simplicity, speed, and user privacy. No data is stored, and all QR codes are generated instantly in your browser.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-700">Our Mission</h2>
      <p className="text-gray-700 mb-4">To empower individuals and businesses to create, share, and use QR codes without friction or privacy concerns. We aim to provide a delightful, professional, and accessible experience for all users.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-700">Who Built This?</h2>
      <p className="text-gray-700">This project is crafted and maintained by <a href="https://visheshsanghvi.me/" className="text-purple-700 underline hover:text-blue-700 transition-colors" target="_blank" rel="noopener noreferrer">Vishesh Sanghvi</a>. If you have feedback or want to collaborate, feel free to reach out!</p>
    </section>
  );
}
