import React from 'react';

export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">Have a question, suggestion, or want to say hello? Fill out the form below or email us directly at <a href="mailto:visheshsanghvi112@gmail.com" className="text-blue-700 underline hover:text-purple-700 transition-colors">visheshsanghvi112@gmail.com</a>.</p>
      <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input id="contact-name" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" placeholder="Your Name" required />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input id="contact-email" type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea id="contact-message" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none" rows={5} placeholder="How can we help you?" required />
        </div>
        <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg">Send Message</button>
      </form>
    </section>
  );
}
