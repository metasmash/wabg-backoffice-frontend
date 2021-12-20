import React, { useState } from 'react'
import {
    Button,
    CircularProgress,
    Container,
    FormControl,
    makeStyles,
    Paper,
    TextField,
} from '@material-ui/core'
import wabgLogo from '../images/wabg-logo.png'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { selectAuthError, selectIsAuthLoading } from '../ducks/auth/selector'
import { PopUp } from '../component/PopUp'
import { authSlice } from '../ducks/auth/reducer'

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    paper: {
        borderRadius: '20px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: 500,
        minWidth: 500,
        padding: '10px 10px 20px 10px',
    },
    textField: {
        margin: '0px 0px 30px 0px',
    },
    logo: {
        objectFit: 'contain',
        width: 350,
        marginBottom: 10,
        userSelect: 'none',
    },
    form: {
        marginTop: 50,
        width: '80%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
})

export const LoginPage = () => {
    const [signInData, setSignInData] = useState({ username: '', password: '' })

    const dispatch = useAppDispatch()
    const error = useAppSelector(selectAuthError)
    const isLoading = useAppSelector(selectIsAuthLoading)

    const handleChangeSignInData = (event: any) => {
        const { name, value } = event.target

        setSignInData((data) => ({
            ...data,
            [name]: value,
        }))
    }

    const handleSubmit = (event: any) => {
        if (!isLoading) {
            dispatch(authSlice.actions.login(signInData))
        }
    }

    const isDisabled = () => !signInData.username || !signInData.password

    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper} elevation={12}>
                <img className={classes.logo} src={wabgLogo} alt="wabg-logo" />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <TextField
                            onChange={handleChangeSignInData}
                            className={classes.textField}
                            fullWidth
                            name="username"
                            id="username"
                            label="Nom d'utilisateur"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            onChange={handleChangeSignInData}
                            className={classes.textField}
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            label="Mot de passe"
                            variant="outlined"
                        />
                    </FormControl>
                    <Button
                        style={{ marginTop: 10, marginBottom: 20 }}
                        disabled={isDisabled()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        {isLoading ? (
                            <CircularProgress
                                size={25}
                                style={{ color: 'white' }}
                            />
                        ) : (
                            'Se connecter'
                        )}
                    </Button>
                </form>
            </Paper>
            <PopUp
                message={error}
                onCloseCallback={() => dispatch(authSlice.actions.clearError())}
            />
        </Container>
    )
}
