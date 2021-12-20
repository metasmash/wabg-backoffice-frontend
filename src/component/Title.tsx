import React from 'react'
import { Typography } from '@material-ui/core'

export const Title = ({
    children,
    marginBottom = 50,
}: {
    children: any
    marginBottom?: number
}) => {
    return (
        <Typography style={{ fontSize: '30px', marginBottom: marginBottom }}>
            {children}
        </Typography>
    )
}
