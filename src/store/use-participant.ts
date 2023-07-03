import { create } from 'zustand'
import { user_state } from '@/types/users.type';
import { session_chart } from '@/types/chart.type';
import { gifs } from '@/types/gifs.type';
import { itemsPerPage } from '@/utils/constant';

type ProfileKey = "firstName" | "lastName" | "initials" | "org" | "norm" | "createdAt";


export interface ParticipantState {
    registerd_users: number,
    active_users: number,
    premium_users: number,
    online_users: number,
    users_state: Array<user_state>,
    gender_state: Array<user_state>,
    location_state: boolean,
    total_session: number,
    total_visitor: number,
    total_time: number,
    bounce_rate: number,
    session_arr: Array<session_chart>,
    visitor_arr: Array<session_chart>,
    time_arr: Array<session_chart>,
    monthly_arr: Array<session_chart>,
    bounce_arr: Array<session_chart>,
    gif_arr: Array<gifs>,
    selected_page: number,
    setRegisteredUsers: (value: number) => void,
    setActiveUsers: (value: number) => void,
    setPremiumUsers: (value: number) => void,
    setOnlineUsers: (value: number) => void,
    setUserState: (valuue: Array<user_state>) => void,
    setGenderState: (valuue: Array<user_state>) => void,
    setLocationState: (value: boolean) => void,
    setTotalSession: (value: number) => void,
    setTotalVisitor: (value: number) => void,
    setTotalTime: (value: number) => void,
    setBounceRate: (value: number) => void,
    setSessionArray: (value: Array<session_chart>) => void,
    setVisitorArray: (value: Array<session_chart>) => void,
    setTimeArray: (value: Array<session_chart>) => void,
    setMonthlyArray: (value: Array<session_chart>) => void,
    setBounceArray: (value: Array<session_chart>) => void,
    setGifArray: (value: Array<gifs>) => void,
    setPage: (value: number) => void,
}

const useParticipantStore = create<ParticipantState>((set) => ({
    registerd_users: 0,
    active_users: 0,
    premium_users: 0,
    online_users: 0,
    users_state: [],
    gender_state: [],
    location_state: true,
    total_session: 0,
    total_visitor: 0,
    total_time: 0,
    bounce_rate: 0,
    session_arr: [],
    visitor_arr: [],
    time_arr: [],
    monthly_arr: [],
    bounce_arr: [],
    gif_arr: [],
    selected_page: 0,
    setRegisteredUsers: (value: number) => set((state) => ({ registerd_users: value })),
    setActiveUsers: (value: number) => set((state) => ({ active_users: value })),
    setPremiumUsers: (value: number) => set((state) => ({ premium_users: value })),
    setOnlineUsers: (value: number) => set((state) => ({ online_users: value })),
    setUserState: (value: Array<user_state>) => set((state) => ({ users_state: value })),
    setGenderState: (value: Array<user_state>) => set((state) => ({ gender_state: value })),
    setLocationState: (value: boolean) => set((state) => ({ location_state: value })),
    setTotalSession: (value: number) => set((state) => ({ total_session: value })),
    setTotalVisitor: (value: number) => set((state) => ({ total_visitor: value })),
    setTotalTime: (value: number) => set((state) => ({ total_time: value })),
    setBounceRate: (value: number) => set((state) => ({ bounce_rate: value })),
    setSessionArray: (value: Array<session_chart>) => set((state) => ({ session_arr: value })),
    setVisitorArray: (value: Array<session_chart>) => set((state) => ({ visitor_arr: value })),
    setTimeArray: (value: Array<session_chart>) => set((state) => ({ time_arr: value })),
    setMonthlyArray: (value: Array<session_chart>) => set((state) => ({ monthly_arr: value })),
    setBounceArray: (value: Array<session_chart>) => set((state) => ({ bounce_arr: value })),
    setGifArray: (value: Array<gifs>) => set((state) => ({ gif_arr: value })),
    setPage: (value: number) => set((state) => ({ selected_page: value })),
    initiateStore: () => set((state) => {
        return {
            registerd_users: 0,
            active_users: 0,
            premium_users: 0,
            online_users: 0,
            location_state: true,
        }
    }),
}));

export default useParticipantStore;