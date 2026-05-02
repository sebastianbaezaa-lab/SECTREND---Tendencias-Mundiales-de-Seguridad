import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CATEGORY_INFO } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { TrendCard } from '../components/TrendCard';
import { motion } from 'motion/react';
import { useTrends } from '../context/TrendContext';

export function CategoryDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { trends } = useTrends();
  
  const categoryName = decodeURIComponent(name || '');
  const info = CATEGORY_INFO[categoryName];
  
  const categoryTrends = trends
    .filter(t => t.category === categoryName)
    .sort((a, b) => new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime());

  if (!info) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
        <Button onClick={() => navigate('/categories')} variant="outline">View All Categories</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <Button variant="ghost" size="sm" onClick={() => navigate('/categories')} className="mb-8 -ml-3 text-slate-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO CATEGORIES
        </Button>

        <div className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl font-mono">
            {info.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTrends.map((trend, i) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <TrendCard trend={trend} />
            </motion.div>
          ))}
        </div>
        
        {categoryTrends.length === 0 && (
          <div className="text-center py-20 text-slate-500 bg-[#0B1224] rounded-lg border border-dashed border-slate-700 font-mono text-sm">
            No trends currently tracked in this category.
          </div>
        )}
      </div>
    </div>
  );
}
