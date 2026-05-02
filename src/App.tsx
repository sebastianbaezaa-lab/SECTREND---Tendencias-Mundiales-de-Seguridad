import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TrendProvider } from './context/TrendContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Trends } from './pages/Trends';
import { TrendDetail } from './pages/TrendDetail';
import { Categories } from './pages/Categories';
import { CategoryDetail } from './pages/CategoryDetail';
import { Search } from './pages/Search';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="sectrend-theme">
      <TrendProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="trends" element={<Trends />} />
              <Route path="trends/:id" element={<TrendDetail />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:name" element={<CategoryDetail />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </TrendProvider>
    </ThemeProvider>
  );
}
