import React from 'react'
import { useDispatch } from 'react-redux'
import { authSlice } from '../ducks/auth/reducer'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import { Title } from '../component/Title'

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        borderRadius: '0% 0% 20px 20px',
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
            <Title> Bienvenue sur WABG Backoffice</Title>
        </div>
    )
}
