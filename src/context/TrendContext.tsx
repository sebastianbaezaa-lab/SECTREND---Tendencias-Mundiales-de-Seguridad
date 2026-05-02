import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trend } from '../types';
import { mockTrends } from '../data/mockData';
import { fetchLiveFeedsFrontend } from '../services/feedService';

interface TrendContextType {
  trends: Trend[];
  loading: boolean;
  error: string | null;
}

const TrendContext = createContext<TrendContextType>({
  trends: mockTrends,
  loading: false,
  error: null,
});

export const useTrends = () => useContext(TrendContext);

export const TrendProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trends, setTrends] = useState<Trend[]>(mockTrends);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      let isBackendAvailable = false;
      try {
        const response = await fetch('/api/trends');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTrends(data);
            isBackendAvailable = true;
          }
        }
      } catch (err) {
        console.warn("Backend /api/trends is not working (expected on Vercel statics), falling back to client fetch.");
      } 
      
      if (!isBackendAvailable) {
        try {
          const clientFeeds = await fetchLiveFeedsFrontend();
          if (clientFeeds && clientFeeds.length > 0) {
            // Keep fake trends concatenated at the end since there might not be that many articles
            setTrends([...clientFeeds, ...mockTrends]);
          } else {
            setError("Using offline data");
          }
        } catch (err) {
          setError("Using offline data");
        }
      }
      setLoading(false);
    };

    fetchTrends();
  }, []);

  return (
    <TrendContext.Provider value={{ trends, loading, error }}>
      {children}
    </TrendContext.Provider>
  );
};
