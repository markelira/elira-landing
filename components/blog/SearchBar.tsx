'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { searchStyles } from '@/lib/blog-design-tokens';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={searchStyles.container}>
      <input
        type="text"
        placeholder="Mit keresel? Írj be egy kulcsszót..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={searchStyles.input}
      />
      <button type="submit" className={searchStyles.icon}>
        <Search />
      </button>
    </form>
  );
}
