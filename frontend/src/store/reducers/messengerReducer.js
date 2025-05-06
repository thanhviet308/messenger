import {
    FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS,
    SOCKET_MESSAGE, UPDATE_FRIEND_MESSAGE, MESSAGE_SEND_SUCCESS_CLEAR,
    SEEN_MESSAGE, DELIVARED_MESSAGE, UPDATE, MESSAGE_GET_SUCCESS_CLEAR,
    SEEN_ALL
} from "../types/messengerType";

const messengerState = {
    friends: [],
    message: [],
    mesageSendSuccess: false,
    message_get_success: false
}

export const messengerReducer = (state = messengerState, action) => {
    const { type, payload } = action;
    if (type === FRIEND_GET_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    if (type === MESSAGE_GET_SUCCESS) {
        return {
            ...state,
            message_get_success: true,
            message: payload.message
        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            mesageSendSuccess: true,
            message: [...state.message, payload.message]
        }
    }

    if (type === SOCKET_MESSAGE) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    }

    if (type === UPDATE_FRIEND_MESSAGE) {
        return {
            ...state,
            friends: state.friends.map(friend =>
                (friend.fndInfo._id === payload.msgInfo.reseverId || friend.fndInfo._id === payload.msgInfo.senderId)
                    ? {
                        ...friend,
                        msgInfo: {
                            ...payload.msgInfo,
                            status: payload.status
                        }
                    }
                    : friend
            )
        };
    }


    if (type === SEEN_MESSAGE) {
        return {
            ...state,
            friends: state.friends.map(friend =>
                friend.fndInfo._id === payload.msgInfo.reseverId || friend.fndInfo._id === payload.msgInfo.senderId
                    ? {
                        ...friend,
                        msgInfo: {
                            ...friend.msgInfo,
                            status: 'seen'
                        }
                    }
                    : friend
            )
        };
    }


    if (type === DELIVARED_MESSAGE) {
        return {
            ...state,
            friends: state.friends.map(friend =>
                friend.fndInfo._id === payload.msgInfo.reseverId || friend.fndInfo._id === payload.msgInfo.senderId
                    ? {
                        ...friend,
                        msgInfo: {
                            ...friend.msgInfo,
                            status: 'delivered'
                        }
                    }
                    : friend
            )
        };
    }


    if (type === MESSAGE_SEND_SUCCESS_CLEAR) {
        return {
            ...state,
            mesageSendSuccess: false
        }
    }

    if (type === UPDATE) {
        return {
            ...state,
            friends: state.friends.map(friend =>
                friend.fndInfo._id === payload.id
                    ? {
                        ...friend,
                        msgInfo: friend.msgInfo ? {
                            ...friend.msgInfo,
                            status: 'seen'
                        } : undefined
                    }
                    : friend
            )
        };
    }


    if (type === MESSAGE_GET_SUCCESS_CLEAR) {
        return {
            ...state,
            message_get_success: false
        }
    }

    if (type === SEEN_ALL) {
        return {
            ...state,
            friends: state.friends.map(friend =>
                friend.fndInfo._id === payload.reseverId
                    ? {
                        ...friend,
                        msgInfo: {
                            ...friend.msgInfo,
                            status: 'seen'
                        }
                    }
                    : friend
            )
        };
    }

    return state;
}
