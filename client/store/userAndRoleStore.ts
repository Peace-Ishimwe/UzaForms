import { create } from "zustand";

interface store {
    usersAndRoles: any,
    setUsersAndRoles: (data: any) => void
}

export const userAndRoleStore = create<store>((set) => ({
    usersAndRoles: null,
    setUsersAndRoles: (data: any) => {
        set({ usersAndRoles: data })
    }
}))