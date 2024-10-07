import { jwtVerify } from 'jose';
const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as { payerId: string; taskId: string };
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}