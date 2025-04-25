
// authenticate and fetch user details
export const fetchUser = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        const user = await res.json();
        
        if (res.ok && user) {
            return user;
        } else {
            console.error(`Failed to fetch user: ${res.status} ${res.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error during fetch: ${error}`);
    }
};