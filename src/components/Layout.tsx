import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex h-screen flex-col bg-[#0A0F1D] text-slate-200 font-sans overflow-hidden">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0A0F1D]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
