import React from 'react'
import { Grid } from '@material-ui/core'

export const Layout = ({ children }: { children: any }) => (
    <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
            {children}
        </Grid>
        <Grid item xs={1} />
    </Grid>
)
