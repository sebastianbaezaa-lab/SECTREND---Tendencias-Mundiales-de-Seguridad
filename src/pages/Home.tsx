import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { mockTrends, mockStats } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TrendCard } from '../components/TrendCard';
import { useTranslation } from 'react-i18next';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const criticalTrends = mockTrends
    .filter(t => t.severity === 'Critical')
    .slice(0, 3);
    
  const recentTrends = [...mockTrends]
    .sort((a, b) => new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime())
    .slice(0, 6);

  // We map the mock stats labels here (or they could be localized normally)
  const getStatLabel = (label: string) => {
    if (label === 'Active Threats Tracked') return t('home.stats.active_threats');
    if (label === 'Critical CVEs (7 days)') return t('home.stats.critical_cves');
    if (label === 'Data Breached (TB)') return t('home.stats.data_breached');
    return label;
  }

  return (
    <div className="flex-1 overflow-y-auto w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative mx-auto max-w-7xl px-4 py-24 md:py-32 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              {t('home.hero.title1')} <span className="text-blue-500">{t('home.hero.title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-mono tracking-tight leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-2xl mx-auto backdrop-blur-sm"
          >
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-6 h-5 w-5 text-slate-500" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                className="h-14 pl-14 pr-32 text-lg rounded-full border-slate-700 bg-slate-900/50 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="default" className="absolute right-2 h-10 rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wider">
                {t('home.search_btn')}
              </Button>
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          >
            {mockStats.map((stat, i) => (
              <div key={i} className="bg-[#0B1224] border border-slate-800 p-6 rounded-lg shadow-sm">
                <div className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-2">{getStatLabel(stat.label)}</div>
                <div className="flex items-baseline gap-2 justify-center">
                  <span className="text-3xl font-bold text-white font-mono">{stat.value}</span>
                  <span className={`text-xs font-bold font-mono ${stat.trend > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Critical Threats Section */}
      <section className="py-16 bg-[#0A0F1D]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                {t('home.critical_threats.title')}
              </h2>
              <p className="text-slate-400 mt-1 font-mono text-sm uppercase tracking-wider">{t('home.critical_threats.subtitle')}</p>
            </div>
            <Button variant="ghost" onClick={() => navigate('/trends?severity=Critical')} className="hidden sm:flex text-blue-500 hover:text-blue-400">
              {t('home.critical_threats.view_all')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criticalTrends.map((trend, i) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <TrendCard trend={trend} />
              </motion.div>
            ))}
          </div>
          <Button variant="outline" onClick={() => navigate('/trends?severity=Critical')} className="w-full mt-6 sm:hidden border-slate-700 text-slate-300">
            {t('home.critical_threats.view_all_mobile')}
          </Button>
        </div>
      </section>

      {/* Recent Disclosures */}
      <section className="py-16 bg-[#0F172A] border-t border-slate-800">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-emerald-500" />
                {t('home.latest_intel.title')}
              </h2>
              <p className="text-slate-400 mt-1 font-mono text-sm uppercase tracking-wider">{t('home.latest_intel.subtitle')}</p>
            </div>
            <Button variant="ghost" onClick={() => navigate('/trends')} className="hidden sm:flex text-blue-500 hover:text-blue-400">
              {t('home.latest_intel.browse_all')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTrends.map((trend, i) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <TrendCard trend={trend} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button size="lg" onClick={() => navigate('/trends')} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
              {t('home.latest_intel.explore_all')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
