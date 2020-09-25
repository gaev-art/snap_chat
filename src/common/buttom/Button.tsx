import style from '../../m1-ui/loginPage/LoginPage.module.scss';
import Button from '@material-ui/core/Button/Button';
import React from 'react';


type Props = {
    name: string
    disabled?: boolean,
    onClickHandler: () => void
}

export const Btn = (props: Props) => {

    return (
        <div className={style.btn}>
            <Button
                className={style.buttonText}
                size='medium'
                variant='outlined'
                color='primary'
                disabled={props.disabled}
                onClick={props.onClickHandler}>
                {props.name}
            </Button>
        </div>
    )
}