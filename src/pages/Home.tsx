import React from 'react'
import { useDispatch } from 'react-redux'
import { authSlice } from '../ducks/auth/reducer'
import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    title: { fontSize: '30px' },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        borderRadius: '0% 0% 20% 20%',
        padding: '30px 30px 30px 30px',
    },
})

export const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(authSlice.actions.logout())
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <Typography className={classes.title}>
                    Bienvenue sur WABG Backoffice
                </Typography>
            </Paper>
        </div>
    )
}
