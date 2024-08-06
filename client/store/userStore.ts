import { create } from "zustand";

interface store {
    users: any,
    setUsers: (data: any) => void
}

export const userStore = create<store>((set) => ({
    users: null,
    setUsers: (data: any) => {
        set({ users: data })
    }
}))