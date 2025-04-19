
const initialState = {
    logged: false,
    user: null,
};

const hospitalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                logged: true,
                user: action.payload
            }

        case 'logout':
            return {
                ...state,
                logged: false,
                user: null,
            };

        default:
            return state;
    }
};

export default hospitalReducer;



// 상태를 업데이트하는 로직