import { CredentialsType } from '@/types/login';

// authenticate and fetch user details
export const fetchUser = async (url: string, body: CredentialsType) => {
    try {
        console.log('[FETCH USER]: ',url, body);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        // const res = await axios.post(url, body);
        const user = await res.json();

        if (res.ok && user) {
            return user;
        } else {
            console.error(`Failed to fetch user: ${res.status} ${res.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error during fetch: ${error}`);
        return null;
    }
};