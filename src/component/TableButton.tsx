import React from 'react'
import Storage from '@material-ui/icons/Storage'
import { Button, Grid } from '@material-ui/core'

interface TableButtonProps {
    children: any
}

export const TableButton = ({ children }: TableButtonProps) => {
    return (
        <Button style={{ width: '100%', minHeight: 100 }}>
            <Grid direction="column" container>
                <Grid item xs={12}>
                    <Storage fontSize="large" color="primary" />
                </Grid>
                <Grid style={{ fontSize: 15 }} item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Button>
    )
}
