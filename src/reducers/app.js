const initialState = {
    isLogged: false,
    activeUser: {},
    isShowLoginModal: false,
    isShowAddNewsModal: false,
    usersList: [
        {
            isAdmin: true,
            login: 'Admin',
            password: '12345',
        },
        {
            isAdmin: false,
            login: 'User',
            password: '12345',
        }
    ],
};

export const app = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_LOG_IN':
            return {...state, isLogged: true, activeUser: action.payload, isShowLoginModal: false};

        case 'SET_LOG_OUT':
            return {...state, isLogged: false, activeUser: {}};

        case 'OPEN_LOGIN_MODAL':
            return {...state, isShowLoginModal: true};

        case 'CLOSE_LOGIN_MODAL':
            return {...state, isShowLoginModal: false};

        case 'OPEN_ADD_NEWS_MODAL':
            return {...state, isShowAddNewsModal: true};

        case 'CLOSE_ADD_NEWS_MODAL':
            return {...state, isShowAddNewsModal: false};

        default:
            return state;
    }
};