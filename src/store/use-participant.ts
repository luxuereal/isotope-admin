import { create } from 'zustand'

type ProfileKey = "firstName" | "lastName" | "initials" | "org" | "norm" | "createdAt";

export interface ParticipantState {
    registerd_users: number,
    active_users: number,
    premium_users: number,
    online_users: number,
    setRegisteredUsers: (value: number) => void,
    setActiveUsers: (value: number) => void,
    setPremiumUsers: (value: number) => void,
    setOnlineUsers: (value: number) => void,
}

const useParticipantStore = create<ParticipantState>((set) => ({
    registerd_users: 0,
    active_users: 0,
    premium_users: 0,
    online_users: 0,
    setRegisteredUsers: (value: number) => set((state) => ({ registerd_users: value })),
    setActiveUsers: (value: number) => set((state) => ({ active_users: value })),
    setPremiumUsers: (value: number) => set((state) => ({ premium_users: value })),
    setOnlineUsers: (value: number) => set((state) => ({ online_users: value })),
    initiateStore: () => set((state) => {
        return {
            registerd_users: 0,
            active_users: 0,
            premium_users: 0,
            online_users: 0,
        }
    })
}));

export default useParticipantStore;