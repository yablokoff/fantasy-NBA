
const storeKey = 'user_id';

export const login = (user_id) => {
    localStorage.setItem(storeKey, user_id);
};

export const logout = function() {
    localStorage.removeItem(storeKey);
};

export const getUser = () => {
    return localStorage.getItem(storeKey);
};

export const isAuthenticated = () => {
    const user = getUser();
    return !!user;
};
