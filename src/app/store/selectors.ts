import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from './zustandStore';

export const useIsAdmin = () => useUserStore(useShallow(state => state.admin));
export const useIsManager = () => useUserStore(useShallow(state => state.manager));