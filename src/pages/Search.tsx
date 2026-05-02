import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { mockTrends } from '../data/mockData';
import { TrendCard } from '../components/TrendCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get('q') as string;
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const searchResults = mockTrends.filter((trend) => {
    if (!query) return false;
    const q = query.toLowerCase();
    return (
      trend.title.toLowerCase().includes(q) ||
      trend.description.toLowerCase().includes(q) ||
      trend.affectedSystems.some(s => s.toLowerCase().includes(q)) ||
      trend.category.toLowerCase().includes(q) ||
      trend.id.toLowerCase().includes(q)
    );
  });

  // Track search history
  useEffect(() => {
    if (query) {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      if (!history.includes(query)) {
        const newHistory = [query, ...history].slice(0, 5);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }
    }
  }, [query]);

  const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Advanced Recon</h1>
          <form onSubmit={handleSearch} className="relative flex items-center shadow-lg">
            <SearchIcon className="absolute left-6 h-5 w-5 text-slate-500" />
            <Input
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Search by CVE ID, software name, threat actor..."
              className="h-14 pl-14 pr-32 text-lg rounded-full border-slate-700 bg-slate-900/50 focus-visible:ring-blue-500 font-mono w-full text-white placeholder-slate-500"
              autoFocus
            />
            <Button type="submit" size="default" className="absolute right-2 h-10 rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wider">
              SEARCH
            </Button>
          </form>

          {(!query && searchHistory.length > 0) && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Recent:</span>
              {searchHistory.map((h: string) => (
                <button
                  key={h}
                  onClick={() => setSearchParams({ q: h })}
                  className="text-xs bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 px-3 py-1 rounded font-mono transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>

        {query && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              {searchResults.length} {searchResults.length === 1 ? 'RESULT' : 'RESULTS'} FOR "{query}"
            </h2>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((trend) => (
                  <div key={trend.id}>
                    <TrendCard trend={trend} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#0B1224] rounded-lg border border-dashed border-slate-700">
                <SearchIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No matches found</h3>
                <p className="text-slate-400 mb-6 font-mono text-sm max-w-md mx-auto">We couldn't find anything matching "{query}". Try checking your spelling or use more general terms.</p>
                <Button variant="outline" onClick={() => navigate('/trends')}>BROWSE ALL TRENDS</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
