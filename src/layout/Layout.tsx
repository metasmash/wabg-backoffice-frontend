import React from 'react'
import {
    Backdrop,
    CircularProgress,
    Grid,
    makeStyles,
    Paper,
} from '@material-ui/core'
import { selectIsLoading } from '../ducks/root/selectors'
import { useAppSelector } from '../ducks/root/hooks'

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0% 0% 20px 20px',
        padding: '30px 30px 70px 30px',
        marginBottom: 50,
        background: '#f5f5f5',
    },
})

export const Layout = ({ children }: { children: any }) => {
    const classes = useStyles()
    const isLoading = useAppSelector(selectIsLoading)

    return (
        <Grid container>
            <Backdrop open={isLoading} style={{ zIndex: 10 }}>
                <CircularProgress
                    size={300}
                    thickness={2}
                    style={{ color: '#ff8c00' }}
                />
            </Backdrop>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Paper elevation={5} className={classes.paper}>
                    {children}
                </Paper>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    )
}
