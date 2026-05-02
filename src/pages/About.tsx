import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const features = [
    {
      icon: <Eye className="h-6 w-6 text-blue-500" />,
      title: "REAL-TIME TRACKING",
      description: "We monitor global threat feeds, social media, and vulnerability databases to bring you the latest intelligence as it happens."
    },
    {
      icon: <Database className="h-6 w-6 text-blue-500" />,
      title: "COMPREHENSIVE ARCHIVE",
      description: "Access our rich historical database of CVEs, data breaches, and malware campaigns to understand long-term threat vectors."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "ACTIONABLE INSIGHTS",
      description: "We don't just report the news; we provide specific remediation steps, affected software versions, and IoCs to protect your infrastructure."
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-500" />,
      title: "VENDOR NEUTRAL",
      description: "Our intelligence is unbiased and platform-agnostic, ensuring you get the facts without marketing spin."
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full pb-16">
        <div className="max-w-3xl mx-auto text-center mb-16 pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            About <span className="text-blue-500">SecTrend</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-mono"
          >
            Democratizing access to high-quality cyber threat intelligence. We believe that organizations of all sizes should have visibility into the threats that could impact their operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-[#0B1224] border border-slate-800 rounded-lg"
            >
              <div className="shrink-0 bg-slate-900 border border-slate-700 h-14 w-14 flex items-center justify-center rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-1">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-mono">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-slate-900/50 border border-blue-900/30 rounded-lg p-8 md:p-12 text-center shadow-[0_0_15px_rgba(30,58,138,0.2)]">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Our Methodology</h2>
          <p className="text-slate-300 font-serif leading-relaxed mb-6">
            SecTrend aggregates data from over 500 open-source intelligence (OSINT) feeds, government advisories, and security researcher publications. Our automated systems rank threats based on severity, exploitability, and potential impact before they are reviewed by our analyst team for publication.
          </p>
          <p className="text-[10px] uppercase font-mono border-t border-slate-800 pt-6 text-slate-500 tracking-wider">
            Disclaimer: This is a demo application. Data provided is mock data for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
