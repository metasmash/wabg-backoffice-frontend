import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'

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
    return (
        <Grid container>
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
