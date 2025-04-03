import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authType";
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

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    if (type === REGISTER_FAIL) {
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            myInfo: '',
            loading: true
        }
    }

    if (type === REGISTER_SUCCESS) {
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
    return state;
}
