import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 py-20 text-center w-full">
      <ShieldAlert className="h-20 w-20 text-red-500 mb-6" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">404</h1>
      <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Anomaly Detected</h2>
      <p className="text-sm text-slate-400 font-mono max-w-md mx-auto mb-8">
        The requested resource path does not exist on this server. Proceed to the main dashboard.
      </p>
      <Button onClick={() => navigate('/')} size="default" variant="outline">
        RETURN TO DASHBOARD
      </Button>
    </div>
  );
}
