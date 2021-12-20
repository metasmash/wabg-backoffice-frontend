import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    AppBar,
    Box,
    Button,
    Container,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { routes } from '../constants'
import { useAppDispatch } from '../ducks/root/hooks'

const pages = [
    { text: 'Accueil', path: routes.HOME },
    { text: 'Tables', path: routes.TABLES },
    { text: 'Utilisateurs', path: routes.USERS },
]

const useStyle = makeStyles({
    typography: {
        color: '#d5d5d5',
    },
    appBar: {
        background: '#2E3B55',
    },
})

export const HeaderBar = () => {
    const classes = useStyle()

    const history = useHistory()

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Container maxWidth="xs">
                <Toolbar disableGutters>
                    <Box>
                        {pages.map((page) => (
                            <Button key={page.text}>
                                <Typography className={classes.typography}>
                                    {page.text}
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                    <Box style={{ right: '10px' }} sx={{ flexGrow: 0 }}>
                        Deconnexion
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
