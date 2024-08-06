import { create } from "zustand";

interface store {
    user: any,
    setUser: (data: any) => void
}

export const useAuthStore = create<store>((set) => ({
    user: null,
    setUser: (data: any) => {
        set({ user: data })
    }
}))