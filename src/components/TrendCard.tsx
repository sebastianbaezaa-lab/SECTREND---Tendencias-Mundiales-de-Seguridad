import React from 'react';
import { format } from 'date-fns';
import { ArrowRight, Activity, Calendar } from 'lucide-react';
import { Trend } from '../types';
import { Link } from 'react-router-dom';

export function TrendCard({ trend }: { trend: Trend }) {
  return (
    <div className="flex flex-col h-full bg-[#0B1224] border border-slate-800 rounded-lg hover:border-slate-600 transition-colors group p-5">
      <div className="flex justify-between items-start gap-4 mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
          trend.severity === 'Critical' ? 'bg-red-950 text-red-500 border-red-900' :
          trend.severity === 'High' ? 'bg-orange-950 text-orange-500 border-orange-900' :
          trend.severity === 'Medium' ? 'bg-yellow-950 text-yellow-500 border-yellow-900' :
          'bg-emerald-950 text-emerald-500 border-emerald-900'
        }`}>
          {trend.severity.toUpperCase()}
        </span>
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {format(new Date(trend.dateDiscovered), 'MMM d, yyyy')}
        </span>
      </div>
      
      <Link to={`/trends/${trend.id}`} className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
        {trend.title}
      </Link>
      
      <p className="text-xs text-slate-400 line-clamp-2 mb-4 flex-1">
        {trend.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] uppercase tracking-wider rounded font-mono">
          {trend.category}
        </span>
      </div>
      
      <div className="text-[11px] text-slate-400 mb-4 font-mono">
        <span className="text-slate-500">TARGET:</span>{' '}
        <span className="text-slate-300">{trend.affectedSystems.slice(0, 2).join(', ')}</span>
        {trend.affectedSystems.length > 2 && ' + more'}
      </div>
      
      <div className="pt-4 border-t border-slate-800 mt-auto flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 flex items-center gap-1">
          <Activity className="h-3 w-3 text-blue-500" />
          {(trend.mentions / 1000).toFixed(1)}k MENTIONS
        </span>
        <Link
          to={`/trends/${trend.id}`}
          className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1"
        >
          DETAILS <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
