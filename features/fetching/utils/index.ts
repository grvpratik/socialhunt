import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/v2`;

const instance = axios.create({
    baseURL: BASE_URL,
});

export const ApiService = {
    setAuthToken: (telegramInitData: string) => {
        instance.defaults.headers.common['Authorization'] = `tma ${telegramInitData}`;
    },

    getUser: async () => {
        const response = await instance.post('/user/me');
        return response.data;
    },

    getTasks: async () => {

        const response = await instance.get('user/task');
        return response.data;
    },

    submitTask: async (taskId: string) => {
        const response = await instance.post(`/task/${taskId}/submit`,
        );
        return response;
    },

    getPayouts: async () => {
        const response = await instance.get('/payouts');
        return response.data;
    },
};
