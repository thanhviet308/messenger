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
        const index = state.friends.findIndex(
            f => f.fndInfo._id === payload.msgInfo.reseverId ||
                f.fndInfo._id === payload.msgInfo.senderId
        );

        if (index !== -1) {
            const updatedFriends = [...state.friends];
            updatedFriends[index] = {
                ...updatedFriends[index],
                msgInfo: {
                    ...payload.msgInfo,
                    status: payload.status
                }
            };

            return {
                ...state,
                friends: updatedFriends
            };
        }

        return state;
    }

    if (type === SEEN_MESSAGE) {
        const index = state.friends.findIndex(
            f => f.fndInfo._id === payload.msgInfo.reseverId ||
                f.fndInfo._id === payload.msgInfo.senderId
        );

        if (index !== -1) {
            const updatedFriends = [...state.friends];
            updatedFriends[index] = {
                ...updatedFriends[index],
                msgInfo: {
                    ...updatedFriends[index].msgInfo,
                    status: 'seen'
                }
            };

            return {
                ...state,
                friends: updatedFriends
            };
        }

        return state;
    }

    if (type === DELIVARED_MESSAGE) {
        const index = state.friends.findIndex(
            f => f.fndInfo._id === payload.msgInfo.reseverId ||
                f.fndInfo._id === payload.msgInfo.senderId
        );

        if (index !== -1) {
            const updatedFriends = [...state.friends];
            updatedFriends[index] = {
                ...updatedFriends[index],
                msgInfo: {
                    ...updatedFriends[index].msgInfo,
                    status: 'delivared'
                }
            };

            return {
                ...state,
                friends: updatedFriends
            };
        }

        return state;
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
            friends: state.friends.map(friend => {
                if (friend.fndInfo._id === payload.id) {
                    return {
                        ...friend,
                        msgInfo: friend.msgInfo
                            ? { ...friend.msgInfo, status: 'seen' }
                            : friend.msgInfo
                    };
                }
                return friend;
            })
        };
    }

    if (type === MESSAGE_GET_SUCCESS_CLEAR) {
        return {
            ...state,
            message_get_success: false
        }
    }

    if (type === 'SEEN_ALL') {
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
