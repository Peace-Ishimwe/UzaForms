import { create } from "zustand";

interface store {
    formNames: any,
    setFormNames: (data: any) => void
}

export const FormNamesStore = create<store>((set) => ({
    formNames: null,
    setFormNames: (data: any) => {
        set({ formNames: data })
    }
}))