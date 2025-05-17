import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cat, CatFilter } from '../types/cat';
import { CatService } from '../services/catService';

interface CatContextType {
  cats: Cat[];
  filteredCats: Cat[];
  filters: CatFilter;
  loading: boolean;
  error: string | null;
  fetchCats: () => void;
  filterCats: (filters: CatFilter) => void;
  clearFilters: () => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error('useCatContext must be used within a CatProvider');
  }
  return context;
};

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const [filters, setFilters] = useState<CatFilter>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCats = () => {
    try {
      setLoading(true);
      const fetchedCats = CatService.getCats();
      setCats(fetchedCats);
      setFilteredCats(fetchedCats);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cats');
      setLoading(false);
    }
  };

  const filterCats = (newFilters: CatFilter) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setFilteredCats(CatService.getCats(updatedFilters));
  };

  const clearFilters = () => {
    setFilters({});
    setFilteredCats(cats);
  };

  // Initial fetch
  React.useEffect(() => {
    fetchCats();
  }, []);

  const value = {
    cats,
    filteredCats,
    filters,
    loading,
    error,
    fetchCats,
    filterCats,
    clearFilters,
  };

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};