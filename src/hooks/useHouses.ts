import { useEffect, useState } from 'react';
import HousesService from '../services/houses';
import type { House } from '../services/houses';

export default function useHouses() {

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(fetchHouses, 500); // debounced as reload / remount can happen
    return () => { clearTimeout(timeout); }
  }, []);

  async function fetchHouses() {
    if (lastPage) return;
    console.log('LOG:HOOK:useHouses page:', page);

    // loading for next page shimmer UI
    setLoading(true);
    setError(false);

    const response = await HousesService.GetHouses({ page });
    // check undefined response as error
    if (!response) return setError(true);
    // increment page
    setPage(prevPage => prevPage + 1);
    // add response
    setHouses([...houses, ...response]);
    // cancel initial loading (several loading components)
    setInitialLoading(false);
    // cancel next page loading
    setLoading(false);
    // check empty response as last page
    if (response.length === 0) setLastPage(true);
  }

  return {
    houses,
    loading,
    initialLoading,
    error,
    page,
    nextPage: fetchHouses,
  };
}
