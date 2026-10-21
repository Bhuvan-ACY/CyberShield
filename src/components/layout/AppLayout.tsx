import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLenisScroll } from '@/hooks/useLenisScroll';

export const AppLayout: React.FC = () => {
  useLenisScroll();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-primary font-sans antialiased selection:bg-surface-1">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
