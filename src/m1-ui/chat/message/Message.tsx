import React from 'react';
import style from './Message.module.scss'
import Avatar from '@material-ui/core/Avatar/Avatar';

type Props = {
    name: string
    message: string
}


export const Message = (props: Props) => {
    return (
        <div>
            <div className={style.chatName}>
                <Avatar className={style.chatAvatar}/>
                <div>
                    <b>{props.name}: </b>{props.message}
                </div>
            </div>
            <hr/>
        </div>
    )
};

