import React from 'react';
import style from './Message.module.scss'
import Avatar from '@material-ui/core/Avatar/Avatar';
import {ListItem, ListItemAvatar, ListItemText} from '@material-ui/core';
import ava from '../../../img/ava.png'


type Props = {
    name: string
    message: string
    time: number
}


export const Message = (props: Props) => {


    const date = new Date(props.time).toLocaleString()
    const name = props.name


    return (
        <div>
            <div className={style.chatName}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={ava}/>
                    </ListItemAvatar>
                    <ListItemText className={style.text} primary={name} secondary={props.message}/>
                    <div className={style.date}>{date}</div>
                </ListItem>
            </div>
            <hr/>
        </div>
    )
};

