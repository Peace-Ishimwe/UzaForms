import { create } from "zustand";

interface store {
    groupAndRoles: any,
    setGroupAndRoles: (data: any) => void
}

export const GroupAndRoleStore = create<store>((set) => ({
    groupAndRoles: null,
    setGroupAndRoles: (data: any) => {
        set({ groupAndRoles: data })
    }
}))