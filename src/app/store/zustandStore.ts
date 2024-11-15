import { create } from 'zustand'

interface UserState {
    admin: boolean,
    manager: boolean,
    setAdmin: (isAdmin: boolean) => void,
    setManager: (isManager: boolean) => void,
}

export const useUserStore = create<UserState>()((set) => ({
    admin: false,
    manager: false,
    setAdmin: (isAdmin) => set((state) => ({ ...state, admin: isAdmin })),
    setManager: (isManager) => set((state) => ({ ...state, manager: isManager })),
}))