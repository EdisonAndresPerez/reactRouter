import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '../fakeData/fakeData';

export function useAuthQuery() {
  const token = localStorage.getItem('auth_token');
  return useQuery({
    queryKey: ['auth', token],
    queryFn: () => checkAuth(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 10, 
    retry: false,
  });
}