import { REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR, USER_LOGIN_SUCCESS, USSER_LOGIN_FAIL, LOGOUT_SUCCESS } from "../types/authType";
import deCodeToken from 'jwt-decode';

const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage: '',
    myInfo: ''
}

const tokenDecode = (token) => {
    const tokenDecode = deCodeToken(token);
    const expTime = new Date(tokenDecode.exp * 1000)
    if (new Date() > expTime) {
        return null;
    }
    return tokenDecode;
}

const getToken = localStorage.getItem('authToken');
if (getToken) {
    const getInfo = tokenDecode(getToken);
    if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
    }
}
console.log(getToken);

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    if (type === REGISTER_FAIL || type === USSER_LOGIN_FAIL) {
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            myInfo: '',
            loading: true
        }
    }

    if (type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
        const myInfo = tokenDecode(payload.token);
        return {
            ...state,
            myInfo: myInfo,
            successMessage: payload.successMessage,
            error: '',
            authenticate: true,
            loading: false
        }
    }

    if (type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            successMessage: ''
        }
    }

    if (type === ERROR_CLEAR) {
        return {
            ...state,
            error: ''
        }
    }

    if (type === LOGOUT_SUCCESS) {
        return {
            ...state,
            authenticate: false,
            myInfo: '',
            successMessage: 'Logout Successfull',

        }
    }

    return state;
}
