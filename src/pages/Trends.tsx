import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search as SearchIcon, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Category, Severity } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TrendCard } from '../components/TrendCard';
import { useTranslation } from 'react-i18next';
import { useTrends } from '../context/TrendContext';

const SEVERITIES: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
const CATEGORIES: Category[] = ['CVE', 'Data Breach', 'Malware', 'Zero-Day', 'News', 'Physical Security', 'Logistics', 'Food Defense'];

export function Trends() {
  const { t } = useTranslation();
  const { trends } = useTrends();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const initialSeverity = searchParams.get('severity') as Severity | null;
  const initialCategory = searchParams.get('category') as Category | null;

  const [selectedSeverities, setSelectedSeverities] = useState<Severity[]>(initialSeverity ? [initialSeverity] : []);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(initialCategory ? [initialCategory] : []);

  const filteredTrends = useMemo(() => {
    return trends.filter((trend) => {
      const matchesSearch = searchQuery === '' || 
        trend.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        trend.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = selectedSeverities.length === 0 || selectedSeverities.includes(trend.severity);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(trend.category);

      return matchesSearch && matchesSeverity && matchesCategory;
    }).sort((a, b) => new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime());
  }, [searchQuery, selectedSeverities, selectedCategories]);

  const toggleSeverity = (sev: Severity) => {
    setSelectedSeverities(prev => 
      prev.includes(sev) ? prev.filter(s => s !== sev) : [...prev, sev]
    );
  };

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedSeverities([]);
    setSelectedCategories([]);
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar Filters */}
      <aside className="w-64 border-r border-[#1E293B] bg-[#0F172A] p-6 flex flex-col overflow-y-auto shrink-0 hidden lg:flex">
        <h3 className="font-bold text-white mb-6 flex items-center gap-2 tracking-wide">
          <Filter className="h-4 w-4" /> {t('trends.filters')}
        </h3>
        
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input 
            type="text" 
            placeholder={t('trends.keyword')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full bg-slate-900 border-slate-700 font-mono text-sm"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('trends.severity')}</h4>
            {selectedSeverities.length > 0 && (
              <button onClick={() => setSelectedSeverities([])} className="text-[10px] text-blue-500 hover:text-blue-400 tracking-wider">
                {t('trends.clear')}
              </button>
            )}
          </div>
          <div className="space-y-3">
            {SEVERITIES.map(sev => (
              <label key={sev} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSeverity(sev)}>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  selectedSeverities.includes(sev) 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
                }`}>
                  {selectedSeverities.includes(sev) && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">{sev}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('trends.category')}</h4>
            {selectedCategories.length > 0 && (
              <button onClick={() => setSelectedCategories([])} className="text-[10px] text-blue-500 hover:text-blue-400 tracking-wider">
                {t('trends.clear')}
              </button>
            )}
          </div>
          <div className="space-y-3">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleCategory(cat)}>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  selectedCategories.includes(cat) 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
                }`}>
                  {selectedCategories.includes(cat) && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-auto">
          <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
            {t('trends.reset')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-[#0A0F1D] overflow-y-auto p-4 sm:p-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('trends.title')}</h1>
              <p className="text-slate-400 font-mono text-sm tracking-wide">{t('trends.showing', { count: filteredTrends.length })}</p>
            </div>
            
            {/* Mobile filters toggle would go here */}
          </div>

          {filteredTrends.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-[#0B1224] border border-dashed border-slate-700 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('trends.no_data')}</h3>
              <p className="text-slate-400 font-mono text-sm mb-6">{t('trends.no_data_desc')}</p>
              <Button onClick={clearFilters} variant="outline" size="sm" className="text-white border-slate-700">{t('trends.clear')}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrends.map((trend, i) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <TrendCard trend={trend} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
