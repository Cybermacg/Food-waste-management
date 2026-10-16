import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { type NewBranchAccountRegisterResponse } from '../api/auth'
import { type OrgRegResponse } from '../api/auth';


interface AuthState {
    user : NewBranchAccountRegisterResponse | null;
    setUser : (user: NewBranchAccountRegisterResponse | null) => void;
    clearUser : () => void
}

interface RegState {
    regacc: OrgRegResponse | null;
    setRegacc: (regacc: OrgRegResponse | null) => void;
    clearRegacc: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user : null,
            setUser : (user) => set({user}),
            clearUser :() => set({user:null})
        }),

        {
            name: 'Branch Reg Response'
        }
    )
)
  

export const useRegStore = create<RegState>() (

    persist(
        (set) => ({
            regacc: null,
            setRegacc: (regacc) => set({ regacc }),
            clearRegacc: () => set({ regacc: null }),
        }),

        {
            name: 'reg-store'
        }
    )
)