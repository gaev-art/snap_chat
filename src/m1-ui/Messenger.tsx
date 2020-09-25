import React, {useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import style from './Messenger.module.scss'
import {Chat} from './chat/Chat';
import {LoginPage} from './loginPage/LoginPage';


export const Messenger = () => {

    const [temporaryName, setTemporaryName] = useState('');
    const [name, setName] = useState('unknown');

    return (
        <div className={style.app}>
            <Switch>
                <Route exact path='/' render={() => <Redirect to={`/login`}/>}/>
                <Route path='/login' render={() => <LoginPage
                    setTemporaryName={setTemporaryName}
                    temporaryName={temporaryName}
                    setName={setName}
                    name={name}/>}/>
                <Route path='/chat' render={() => <Chat
                    setTemporaryName={setTemporaryName}
                    name={name}/>}/>
            </Switch>
        </div>
    )
};
