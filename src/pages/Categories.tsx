import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Database, Bug, Zap, Newspaper, ArrowRight, Camera, Truck, ShieldPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORY_INFO, mockTrends } from '../data/mockData';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, React.ReactNode> = {
  "shield-alert": <ShieldAlert className="h-8 w-8 text-blue-500" />,
  "database": <Database className="h-8 w-8 text-purple-500" />,
  "bug": <Bug className="h-8 w-8 text-green-500" />,
  "zap": <Zap className="h-8 w-8 text-yellow-500" />,
  "newspaper": <Newspaper className="h-8 w-8 text-gray-500" />,
  "camera": <Camera className="h-8 w-8 text-teal-500" />,
  "truck": <Truck className="h-8 w-8 text-orange-500" />,
  "shield-plus": <ShieldPlus className="h-8 w-8 text-emerald-500" />,
};

export function Categories() {
  const { t } = useTranslation();

  const getCategoryCount = (category: string) => {
    return mockTrends.filter(t => t.category === category).length;
  };

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('categories.title')}</h1>
          <p className="text-slate-400 font-mono text-sm max-w-2xl tracking-wide">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(CATEGORY_INFO).map(([name, info], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Link 
                to={`/categories/${encodeURIComponent(name)}`}
                className="flex flex-col h-full bg-[#0B1224] border border-slate-800 rounded-lg hover:border-blue-500/50 transition-colors group p-6"
              >
                <div className="bg-slate-900 border border-slate-700 w-12 h-12 flex items-center justify-center rounded-lg mb-6 group-hover:border-blue-500/50 transition-colors">
                  {React.cloneElement(iconMap[info.icon] as React.ReactElement, { className: "h-6 w-6" })}
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight">
                  {name}
                </h2>
                
                <p className="text-xs text-slate-400 font-mono mb-8 flex-1 leading-relaxed">
                  {info.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto w-full">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    {getCategoryCount(name)} {t('categories.incidents')}
                  </span>
                  <span className="text-blue-500 group-hover:translate-x-1 group-hover:text-blue-400 transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
