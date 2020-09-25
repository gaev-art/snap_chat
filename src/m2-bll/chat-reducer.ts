import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {api} from '../m3-dal/api'
import {MessageType, UserType} from '../m1-ui/chat/Chat';
import {AppStateType, InferActionTypes} from './store';


const SET_MESSAGES = 'CHAT/SET_MESSAGES';
const SET_NEW_MESSAGES = 'CHAT/SET_NEW_MESSAGES';
const SET_USER = 'CHAT/SET_USER';
const REMOVED_USER = 'CHAT/REMOVED_USER';


const initialState = {
    messages: [] as Array<MessageType>,
    typingUsers: [] as Array<UserType>
};


export const chatReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_MESSAGES: {
            return {...state, messages: action.messages}
        }
        case SET_NEW_MESSAGES: {
            return {
                ...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter(u => u.id !== action.message.user.id)
            }
        }
        case SET_USER: {
            return {...state, typingUsers: [...state.typingUsers.filter(u => u.id !== action.user.id), action.user]}
        }
        case REMOVED_USER : {
            return {
                ...state,
                typingUsers: state.typingUsers.filter(u => u.id !== action.user.id)
            }
        }
        default:
            return state
    }
};


const action = {
    messagesReceived: (messages: Array<MessageType>) => ({
        type: SET_MESSAGES,
        messages
    } as const),
    newMessageReceived: (message: MessageType) => ({
        type: SET_NEW_MESSAGES,
        message
    } as const),
    typingUserAdded: (user: UserType) => ({
        type: SET_USER,
        user
    } as const),
    typingUserDelete: (user: UserType) => ({
        type: REMOVED_USER,
        user
    } as const)
};

let timerId = 0;

//AC
export const setClientName = (name: string): ThunkType => () => {
    api.sendName(name);
};

export const typeMessage = (): ThunkType => () => {
    api.typeMessage();
};
export const sendMessage = (messages: string): ThunkType => () => {
    api.sendMessage(messages);
};

export const destroyConnection = (): ThunkType => () => {
    api.destroyConnection()
};

//Thunk
export const createConnection = () => (dispatch: Dispatch) => {
    api.createConnection();
    api.subscribe((messages: Array<MessageType>, fn: (data: string) => void) => {
            dispatch(action.messagesReceived(messages));
            fn('data from front');
        },
        (message: MessageType) => {
            dispatch(action.newMessageReceived(message))
        },
        (user: UserType) => {
            dispatch(action.typingUserAdded(user));
            clearTimeout(timerId);
            timerId = window.setTimeout(() => {
                dispatch(action.typingUserDelete(user))
            }, 5000)
        })
};

//Types
type ActionTypes = InferActionTypes<typeof action>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
type InitialStateType = typeof initialState




