
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center animate-fade-in-down">
      <QRCodeGenerator />
    </main>
  );
}
