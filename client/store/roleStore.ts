import { create } from "zustand";

interface store {
    roles: any,
    setRoles: (data: any) => void
}

export const roleStore = create<store>((set) => ({
    roles: null,
    setRoles: (data: any) => {
        set({ roles: data })
    }
}))