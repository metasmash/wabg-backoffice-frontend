import React from 'react'
import { Grid } from '@material-ui/core'

export const Layout = ({ children }: { children: any }) => (
    <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
            {children}
        </Grid>
        <Grid item xs={2} />
    </Grid>
)
