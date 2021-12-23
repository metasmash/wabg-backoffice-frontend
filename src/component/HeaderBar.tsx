import React from 'react'
import {
    AppBar,
    Box,
    Button,
    Container,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Link } from 'component'
import { routes } from '../constants'
import { getCurrentPath } from '../ducks/root/hooks'
import { useDispatch } from 'react-redux'
import { authSlice } from '../ducks/auth/reducer'

const pages = [
    { text: 'Accueil', path: routes.HOME },
    { text: 'Tables', path: routes.TABLES },
    { text: 'Utilisateurs', path: routes.USERS },
]

const useStyle = makeStyles({
    typography: {
        fontWeight: 500,
    },
    appBar: {
        background: '#2E3B55',
    },
    logout: {
        color: '#E8554E',
    },
})

export const HeaderBar = () => {
    const classes = useStyle()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(authSlice.actions.logout())
    }

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Container>
                <Toolbar disableGutters>
                    <Box>
                        {pages.map((page) => (
                            <Link key={page.text} to={page.path}>
                                <Button disableRipple>
                                    <Typography
                                        style={{
                                            color:
                                                getCurrentPath() === page.path
                                                    ? '#d5d5d5'
                                                    : '#d5d5d5a0',
                                        }}
                                        className={classes.typography}
                                    >
                                        {page.text}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <div style={{ position: 'absolute', right: 0 }}>
                        <Button onClick={handleLogOut} disableRipple>
                            <Typography className={classes.logout}>
                                Deconnexion
                            </Typography>
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
