import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/Button';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.trends'), path: '/trends' },
    { name: t('nav.categories'), path: '/categories' },
    { name: t('nav.about'), path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 bg-[#0F172A] shrink-0">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-sm">S</div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">SEC<span className="text-blue-400">TREND</span></span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
             <Link
               key={link.path}
               to={link.path}
               className={`transition-colors hover:text-white ${
                 isActive(link.path) ? 'text-white' : ''
               }`}
             >
               {link.name}
             </Link>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input 
              type="text" 
              placeholder={t('search.placeholder')}
              className="bg-slate-900 border border-slate-700 rounded-md py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64 text-white placeholder-slate-500" 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `/search?q=${e.currentTarget.value}`;
                }
              }}
            />
          </div>
          <Link to="/search" className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-400">
            <Search className="h-4 w-4" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white"
            onClick={toggleLanguage}
            title="Toggle Language"
          >
            <Globe className="h-5 w-5" />
            <span className="ml-1 text-xs font-bold font-mono">{i18n.language === 'es' ? 'ES' : 'EN'}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 md:hidden border-b border-slate-800 bg-[#0F172A] py-4 px-4 space-y-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-slate-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
