import { create } from "zustand";

interface store {
    formAndRoles: any,
    setFormAndRoles: (data: any) => void
}

export const FormAndRoleStore = create<store>((set) => ({
    formAndRoles: null,
    setFormAndRoles: (data: any) => {
        set({ formAndRoles: data })
    }
}))