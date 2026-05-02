import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Share2, ArrowLeft, Calendar, ShieldAlert, Monitor, CheckCircle, ExternalLink, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { useTrends } from '../context/TrendContext';

export function TrendDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { trends } = useTrends();
  const trend = trends.find(t => t.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!trend) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto w-full px-4 py-20 text-center">
        <ShieldAlert className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Trend Not Found</h1>
        <p className="text-slate-400 mb-6 font-mono text-sm">The security trend you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/trends')} variant="outline">Back to Trends</Button>
      </div>
    );
  }

  const relatedTrends = trends.filter(t => trend.relatedIds.includes(t.id));

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8">
      <div className="max-w-4xl mx-auto w-full">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 -ml-3 text-slate-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t('trend_detail.back')}
        </Button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0B1224] border border-slate-800 rounded-lg shadow-sm"
        >
          {/* Header */}
          <div className="p-6 md:p-10 border-b border-slate-800">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`px-3 py-1 rounded text-[10px] font-bold border tracking-wider ${
                trend.severity === 'Critical' ? 'bg-red-950 text-red-500 border-red-900' :
                trend.severity === 'High' ? 'bg-orange-950 text-orange-500 border-orange-900' :
                trend.severity === 'Medium' ? 'bg-yellow-950 text-yellow-500 border-yellow-900' :
                'bg-emerald-950 text-emerald-500 border-emerald-900'
              }`}>
                {trend.severity.toUpperCase()}
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] uppercase tracking-wider rounded font-mono">
                {trend.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              {trend.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" /> {t('trend_detail.discovered')}: {format(new Date(trend.dateDiscovered), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> {(trend.mentions / 1000).toFixed(1)}k {t('trend_detail.mentions')}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{t('trend_detail.executive_summary')}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-slate-300 font-serif">
                    {trend.longDescription}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" /> {t('trend_detail.remediation_protocol')}
                </h2>
                <ul className="space-y-3">
                  {trend.remediation.map((step, index) => (
                    <li key={index} className="flex gap-4 text-slate-300 bg-slate-900/50 border border-slate-800 p-4 rounded-lg items-start">
                      <span className="font-mono text-emerald-500 bg-emerald-950 border border-emerald-900 w-6 h-6 rounded flex items-center justify-center shrink-0 text-[10px]">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-mono leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{t('trend_detail.incident_timeline')}</h2>
                <div className="border-l border-slate-800 ml-3 space-y-8 pb-4">
                  {trend.timeline.map((event, index) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                      <time className="block text-xs font-mono text-blue-400 mb-2 tracking-widest">
                        {format(new Date(event.date), 'MMM d, yyyy')}
                      </time>
                      <p className="text-sm text-slate-300 font-mono">{event.event}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div className="bg-slate-900/80 rounded-lg p-6 border border-slate-800">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-500" /> {t('trend_detail.target_systems')}
                </h3>
                <ul className="space-y-3">
                  {trend.affectedSystems.map((system, index) => (
                    <li key={index} className="text-sm font-mono text-slate-300 flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                      {system}
                    </li>
                  ))}
                </ul>
              </div>

              {trend.references.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{t('trend_detail.external_logs')}</h3>
                  <ul className="space-y-3">
                    {trend.references.map((ref, index) => (
                      <li key={index}>
                        <a 
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-blue-500 hover:text-blue-400 hover:underline flex items-start gap-2"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{ref.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="pt-6 border-t border-slate-800">
                <Button variant="outline" className="w-full justify-center">
                  <Share2 className="mr-2 h-4 w-4 text-slate-400" /> {t('trend_detail.share_report')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Trends */}
        {relatedTrends.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">{t('trend_detail.related_anomalies')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedTrends.map((relatedTrend) => (
                <Link 
                  key={relatedTrend.id} 
                  to={`/trends/${relatedTrend.id}`}
                  className="block p-5 bg-[#0B1224] border border-slate-800 rounded-lg hover:border-slate-600 transition-colors"
                >
                  <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-2">{relatedTrend.category}</div>
                  <h3 className="font-bold text-white mb-2 line-clamp-1">{relatedTrend.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-mono">{relatedTrend.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
