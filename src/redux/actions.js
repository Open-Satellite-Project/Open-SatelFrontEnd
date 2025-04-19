export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const loginSuccess = (user) => ({
    type: LOGIN,
    payload: user,
});

export const logout = () => ({
    type : LOGOUT,
})

// 액션 타입과 액션 생성 함수를 모아두어, 컴포넌트에서 dispatch(loginSuccess(user))
// 같은 식으로 쉽게 액션을 발행할 수 있도록 함