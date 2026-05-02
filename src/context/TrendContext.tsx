import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trend } from '../types';
import { mockTrends } from '../data/mockData';

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
      try {
        const response = await fetch('/api/trends');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTrends(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live trends:", err);
        setError("Using offline data");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <TrendContext.Provider value={{ trends, loading, error }}>
      {children}
    </TrendContext.Provider>
  );
};
