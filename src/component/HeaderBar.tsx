import React, { useState } from 'react'
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    Container,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Link } from 'component'
import { routes } from '../constants'
import { getCurrentPath } from '../ducks/root/hooks'
import { useDispatch } from 'react-redux'
import { authSlice } from '../ducks/auth/reducer'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import TocIcon from '@material-ui/icons/Toc'
import PeopleIcon from '@material-ui/icons/People'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore'

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
    iconXs: {
        color: '#f1f1f1',
    },
})

export const HeaderBar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const isMenuOpen = Boolean(anchorEl)

    const classes = useStyle()
    const dispatch = useDispatch()
    const pages = [
        {
            text: 'Accueil',
            path: routes.HOME,
            icon: <HomeIcon className={classes.iconXs} />,
        },
        {
            text: 'Tables',
            path: routes.TABLES,
            icon: <TocIcon className={classes.iconXs} />,
        },
        {
            text: 'Utilisateurs',
            path: routes.USERS,
            icon: <PeopleIcon className={classes.iconXs} />,
        },
        {
            text: 'Backup',
            path: routes.BACKUP,
            icon: <SettingsBackupRestoreIcon className={classes.iconXs} />,
        },
    ]

    const handleLogOut = () => {
        dispatch(authSlice.actions.logout())
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Container>
                <Toolbar disableGutters>
                    <Box display={{ xs: 'none', md: 'block' }}>
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
                    <Box display={{ xs: 'block', md: 'none' }}>
                        {pages.map(({ text, path, icon }) => (
                            <Link key={text} to={path}>
                                <IconButton>{icon}</IconButton>
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
