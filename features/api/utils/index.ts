import { getTokenMetadata } from '@/features/wallet/utils/getTokenInfo';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/v2`;

const instance = axios.create({
    baseURL: 'http://localhost:8080/v2',
});

export const ApiService = {
    setAuthToken: (telegramInitData: string) => {
        instance.defaults.headers.common['Authorization'] = `tma ${telegramInitData}`;
    },

    getUser: async () => {
        const response = await instance.post('/user/me');
        return response.data;
    },
    getSession: async () => {
        const response = await instance.post('/user/auth/session');
        return response.data;
    },
    verifySession: async (token: string) => {
        const response = await instance.post(`/user/auth/verify?token=${token}`);
        return response.data;
    },

    getTasks: async (platform: string) => {

        const response = await instance.get(`/user/task?platform=${platform}`);
        return response.data;
    },

    submitTask: async (taskId: string) => {
        const response = await instance.post(`/task/${taskId}/submit`,
        );
        return response;
    },
    getGameAccountInfo: async () => {
        const response = await instance.post(`/game/me`,
        );
        return response.data;
    },
    getDungeonsList: async () => {
        const response = await instance.post(`/game/dungeons`,
        );
        return response.data;
    },
    getActiveRaids: async () => {
        const response = await instance.post(`/game/raid/active`,
        );
        return response.data;
    },
    startDungeonRaid: async (dungeonId: string) => {
        const response = await instance.post(`/game/${dungeonId}/start`,
        );
        return response.data;
    },
    claimDungeonRaid: async (raidId: string) => {
        const response = await instance.post(`/game/${raidId}/claim`,
        );
        return response.data;
    },
    getTokenMetadata: async (address:string) => {
        const response = await instance.get(`/game/${address}/info`,
        );
        return response.data;
    },
    getPayouts: async () => {
        const response = await instance.get('/payouts');
        return response.data;
    },
};
