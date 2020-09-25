import React, {KeyboardEvent, useEffect} from 'react';
import style from './LoginPage.module.scss';
import TextField from '@material-ui/core/TextField/TextField';
import {createConnection, setClientName} from '../../m2-bll/chat-reducer';
import {useDispatch} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import {Btn} from '../../common/buttom/Button';

type Props = {
    temporaryName: string,
    name: string
    setName: (name: string) => void,
    setTemporaryName: (name: string) => void
}

export const LoginPage = (props: Props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const setClientNameOnKeyPress = (target: KeyboardEvent<HTMLDivElement>) => {
        if (target.key === 'Enter' && props.temporaryName.length > 0) {
            setClientNameOnClick();
            history.push('/chat')
        }
    };

    const setClientNameOnClick = () => {
        props.setName(props.temporaryName);
        dispatch(setClientName(props.temporaryName));
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTemporaryName(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(createConnection());
    }, [dispatch]);

    return (
        <div className={style.main}>
            <h1 className={style.header}>Welcome to chat</h1>
            <div className={style.nameField}>
                <TextField
                    id='outlined-basic'
                    label='Enter your name'
                    onChange={onChangeHandler}
                    onKeyPress={setClientNameOnKeyPress}/>
            </div>
            <NavLink to={props.temporaryName.length < 1 ? '/login' : '/chat'}>
                <Btn
                    name={'Enter to chat'}
                    disabled={props.temporaryName.length < 1}
                    onClickHandler={setClientNameOnClick}/>
            </NavLink>
        </div>
    )
};