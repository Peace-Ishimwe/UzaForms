import { create } from "zustand";

interface store {
    groupNames: any,
    setgroupNames: (data: any) => void
}

export const groupNamesStore = create<store>((set) => ({
    groupNames: null,
    setgroupNames: (data: any) => {
        set({ groupNames: data })
    }
}))