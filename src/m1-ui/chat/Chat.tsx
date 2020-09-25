import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../m2-bll/store';
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {destroyConnection, sendMessage, typeMessage} from '../../m2-bll/chat-reducer';
import style from './Chat.module.scss'
import TextField from '@material-ui/core/TextField/TextField';
import {NavLink, Redirect} from 'react-router-dom';
import {Message} from './message/Message';
import {Btn} from '../../common/buttom/Button';

type Props = {
    name: string
    setTemporaryName: (name: string) => void
}

export type MessageType = {
    message: string,
    id: number
    addedAt:string
    user: UserType
}

export type UserType = {
    id: string,
    name: string
}


export const Chat = (props: Props) => {

    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers);
    const dispatch = useDispatch();


    const [message, setMessage] = useState('');
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages, typingUsers, isAutoScrollActive]);

    useEffect(() => {
        return () => {
            dispatch(destroyConnection())
        }
    }, [dispatch]);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const scrollMessages = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;
        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 2) {
            setIsAutoScrollActive(true)
        } else {
            setIsAutoScrollActive(false)
        }
        setLastScrollTop(element.scrollTop)
    };

    const sendMessageFunc = () => {
        dispatch(sendMessage(message));
        setMessage('')
    };

    const messageElements = messages.map((m: MessageType) => {
        return <Message key={m.id} time={m.id} name={m.user.name} message={m.message}/>
    });

    const typingUsersElement = typingUsers.map((m: UserType) => {
        return <div key={m.id}>
            <b>{m.name}:</b> ...
        </div>
    });

    const typeMessageFunc = (target: KeyboardEvent<HTMLDivElement>) => {
        if (target.key === 'Enter') {
            sendMessageFunc()
        }
    };

    const onChangeTyping = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
        dispatch(typeMessage())
    };

    const changeName = () => {
        dispatch(destroyConnection())
        props.setTemporaryName('')
    }

    if (props.name === 'unknown') {
        return <Redirect to={`/login`}/>
    }

    return (
        <div className={style.main}>
            <NavLink to={'/login'}>
                <Btn name={'Change name'} onClickHandler={changeName}/>
            </NavLink>
            <div className={style.chatWindow} onScroll={scrollMessages}>
                {messageElements}
                {typingUsersElement}
                <div ref={messagesAnchorRef}/>
            </div>
            <div className={style.messageField}>
                <TextField
                    id='outlined-basic'
                    label='Enter your message...'
                    value={message}
                    onKeyPress={typeMessageFunc}
                    onChange={onChangeTyping}/>
            </div>
            <Btn name={'Send message'} onClickHandler={sendMessageFunc}/>
        </div>
    )
};

