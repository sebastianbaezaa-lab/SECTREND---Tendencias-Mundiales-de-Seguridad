import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="h-10 bg-[#0F172A] border-t border-slate-800 px-4 flex items-center justify-between text-[10px] font-mono text-slate-500 shrink-0 overflow-hidden">
      <div className="flex gap-4 sm:gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="hidden sm:inline">{t('footer.connected')}</span>
        </div>
        <div className="hidden sm:block">{t('footer.loc')}: US-EAST-1</div>
        <div>{t('footer.latency')}: 14ms</div>
      </div>
      <div className="flex gap-2 sm:gap-4 items-center">
        <span className="hidden md:inline">SEC-PROTOCOL-V4.2</span>
        <span>&copy; {new Date().getFullYear()} SECTREND SECURITY SYSTEMS</span>
      </div>
    </footer>
  );
}
