import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { QrCode, Link, MessageSquare, User, Download, Copy, Check } from 'lucide-react';

import Confetti from './Confetti';

const TRANSLATIONS = {
  "en-US": {
    "appTitle": "QR Code Generator",
    "appDescription": "Generate QR codes for URLs, text, and contact information",
    "urlTab": "URL",
    "textTab": "Text",
    "contactTab": "Contact",
    "enterUrl": "Enter URL",
    "enterText": "Enter Text",
    "contactInformation": "Contact Information",
    "websiteUrl": "Website URL",
    "urlPlaceholder": "example.com or https://example.com",
    "urlHelp": "Enter a website URL. If you don't include http://, we'll add https:// automatically.",
    "textContent": "Text Content",
    "textPlaceholder": "Enter any text to generate QR code...",
    "firstName": "First Name",
    "firstNamePlaceholder": "John",
    "lastName": "Last Name",
    "lastNamePlaceholder": "Doe",
    "phoneNumber": "Phone Number",
    "phonePlaceholder": "+1 (555) 123-4567",
    "emailAddress": "Email Address",
    "emailPlaceholder": "john.doe@example.com",
    "organization": "Organization",
    "organizationPlaceholder": "Company Name",
    "website": "Website",
    "websitePlaceholder": "https://example.com",
    "clearAllFields": "Clear All Fields",
    "generatedQrCode": "Generated QR Code",
    "scanQrCode": "Scan this QR code with your device",
    "fillFormPrompt": "Fill in the form to generate your QR code",
    "download": "Download",
    "copyData": "Copy Data",
    "copied": "Copied!",
    "qrCodeData": "QR Code Data:",
    "footerText": "Generate QR codes instantly • No data stored • Free to use",
    "qrCodeAlt": "Generated QR Code"
  },
  "es-ES": {
    "appTitle": "Generador de Códigos QR",
    "appDescription": "Genera códigos QR para URLs, texto e información de contacto",
    "urlTab": "URL",
    "textTab": "Texto",
    "contactTab": "Contacto",
    "enterUrl": "Ingresa URL",
    "enterText": "Ingresa Texto",
    "contactInformation": "Información de Contacto",
    "websiteUrl": "URL del Sitio Web",
    "urlPlaceholder": "ejemplo.com o https://ejemplo.com",
    "urlHelp": "Ingresa una URL de sitio web. Si no incluyes http://, agregaremos https:// automáticamente.",
    "textContent": "Contenido de Texto",
    "textPlaceholder": "Ingresa cualquier texto para generar código QR...",
    "firstName": "Nombre",
    "firstNamePlaceholder": "Juan",
    "lastName": "Apellido",
    "lastNamePlaceholder": "Pérez",
    "phoneNumber": "Número de Teléfono",
    "phonePlaceholder": "+1 (555) 123-4567",
    "emailAddress": "Dirección de Correo",
    "emailPlaceholder": "juan.perez@ejemplo.com",
    "organization": "Organización",
    "organizationPlaceholder": "Nombre de la Empresa",
    "website": "Sitio Web",
    "websitePlaceholder": "https://ejemplo.com",
    "clearAllFields": "Limpiar Todos los Campos",
    "generatedQrCode": "Código QR Generado",
    "scanQrCode": "Escanea este código QR con tu dispositivo",
    "fillFormPrompt": "Completa el formulario para generar tu código QR",
    "download": "Descargar",
    "copyData": "Copiar Datos",
    "copied": "¡Copiado!",
    "qrCodeData": "Datos del Código QR:",
    "footerText": "Genera códigos QR al instante • No se almacenan datos • Gratis",
    "qrCodeAlt": "Código QR Generado"
  }
};

const browserLocale = typeof navigator !== 'undefined' ? (navigator.languages?.[0] || navigator.language || 'en-US') : 'en-US';
const findMatchingLocale = (locale) => {
  if (TRANSLATIONS[locale]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};
const locale = findMatchingLocale(browserLocale);
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [copied, setCopied] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    url: ''
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const qrRef = useRef(null);

  const formatUrl = (url) => {
    if (!url.trim()) return '';
    if (!/^https?:\/\//.test(url)) return 'https://' + url;
    return url;
  };
  const generateVCard = (c) => (
    `BEGIN:VCARD\nVERSION:3.0\nFN:${c.firstName} ${c.lastName}\nN:${c.lastName};${c.firstName};;;\nORG:${c.organization}\nTEL:${c.phone}\nEMAIL:${c.email}\nURL:${c.url}\nEND:VCARD`
  );
  let qrData = '';
  if (activeTab === 'url') qrData = formatUrl(urlInput);
  else if (activeTab === 'text') qrData = textInput.slice(0, 800); // Limit to 800 chars for performance
  else if (activeTab === 'contact' && (contactInfo.firstName || contactInfo.lastName || contactInfo.phone || contactInfo.email)) qrData = generateVCard(contactInfo);

  const downloadQRCode = () => {
    const svg = qrRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    // Add XML declaration and SVG namespace if missing
    if (!source.startsWith('<?xml')) {
      source = `<?xml version="1.0" encoding="UTF-8"?>\n` + source;
    }

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-code-${activeTab}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  const copyToClipboard = async () => {
    if (qrData) {
      try {
        await navigator.clipboard.writeText(qrData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Optionally show a toast or alert
        alert('Failed to copy text to clipboard.');
      }
    }
  };

  const resetForm = () => {
    setUrlInput('');
    setTextInput('');
    setContactInfo({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      organization: '',
      url: ''
    });
  };

  const tabs = [
    { id: 'url', label: t('urlTab'), icon: Link },
    { id: 'text', label: t('textTab'), icon: MessageSquare },
    { id: 'contact', label: t('contactTab'), icon: User }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <Confetti trigger={showConfetti} />
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden mt-8 transition-colors duration-300">
        <div className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <nav className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-purple-600 dark:text-yellow-300 border-b-2 border-purple-600 dark:border-yellow-300 bg-purple-50 dark:bg-gray-800'
                      : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-8 transition-colors duration-300">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-yellow-200 mb-4">
                {activeTab === 'url' && t('enterUrl')}
                {activeTab === 'text' && t('enterText')}
                {activeTab === 'contact' && t('contactInformation')}
              </h2>
              {activeTab === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t('websiteUrl')}
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t('urlPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t('urlHelp')}
                  </p>
                </div>
              )}
              {activeTab === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t('textContent')}
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={t('textPlaceholder')}
                    rows={4}
                    maxLength={800}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">{textInput.length}/800</p>
                </div>
              )}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {t('firstName')}
                      </label>
                      <input
                        type="text"
                        value={contactInfo.firstName}
                        onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                        placeholder={t('firstNamePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {t('lastName')}
                      </label>
                      <input
                        type="text"
                        value={contactInfo.lastName}
                        onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                        placeholder={t('lastNamePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      placeholder={t('phonePlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      {t('emailAddress')}
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      placeholder={t('emailPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('organization')}
                    </label>
                    <input
                      type="text"
                      value={contactInfo.organization}
                      onChange={(e) => setContactInfo({...contactInfo, organization: e.target.value})}
                      placeholder={t('organizationPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('website')}
                    </label>
                    <input
                      type="url"
                      value={contactInfo.url}
                      onChange={(e) => setContactInfo({...contactInfo, url: e.target.value})}
                      placeholder={t('websitePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              )}
              <button
                onClick={resetForm}
                className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                {t('clearAllFields')}
              </button>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-yellow-200">{t('generatedQrCode')}</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 w-full max-w-sm animate-fade-in-up transition-colors duration-300">
                {qrData ? (
                  <div className="text-center">
                    <div className="flex justify-center">
                      <QRCode
                        ref={qrRef}
                        id="qr-svg"
                        value={qrData}
                        size={256}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        className="rounded-xl shadow-lg bg-white transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">{t('scanQrCode')}</p>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <QrCode className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4 animate-fade-in-down" />
                    <p className="text-gray-500 dark:text-gray-400">{t('fillFormPrompt')}</p>
                  </div>
                )}
              </div>
              {qrData && (
                <div className="flex gap-4 w-full max-w-sm">
                  <button onClick={downloadQRCode} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 dark:bg-gradient-to-r dark:from-yellow-400 dark:to-yellow-600 dark:text-gray-900 dark:hover:from-yellow-500 dark:hover:to-yellow-700 transition-all duration-200 font-medium shadow-lg focus:scale-95 active:scale-90">
                    <Download className="w-4 h-4" />
                    {t('download')}
                  </button>
                  <button onClick={copyToClipboard} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium focus:scale-95 active:scale-90">
                    {copied ? (<><Check className="w-4 h-4 text-green-600" />{t('copied')}</>) : (<><Copy className="w-4 h-4" />{t('copyData')}</>)}
                  </button>
                </div>
              )}
              {qrData && (
                <div className="w-full max-w-sm">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t('qrCodeData')}</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-300 max-h-32 overflow-y-auto transition-colors duration-300">
                    <pre className="whitespace-pre-wrap break-words">{qrData}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
