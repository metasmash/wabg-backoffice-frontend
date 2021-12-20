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
})

export const HeaderBar = () => {
    const classes = useStyle()

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Container maxWidth="xs">
                <Toolbar disableGutters>
                    <Box>
                        {pages.map((page) => (
                            <Button disableRipple key={page.text}>
                                <Link to={page.path}>
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
                                </Link>
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
