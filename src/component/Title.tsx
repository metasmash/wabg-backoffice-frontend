import React from 'react'
import { Typography } from '@material-ui/core'

export const Title = ({
    children,
    marginBottom = 50,
    style = {},
}: {
    children: any
    marginBottom?: number
    style?: any
}) => {
    return (
        <Typography
            style={{ fontSize: '30px', marginBottom: marginBottom, ...style }}
        >
            {children}
        </Typography>
    )
}
