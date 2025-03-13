import Header from '@/components/Header';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-1 overflow-hidden border-b border-gray-200">
        <Chat />
      </main>
    </div>
  );
}
