export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const loginSuccess = (user) => ({
    type: LOGIN,
    payload: user,
});