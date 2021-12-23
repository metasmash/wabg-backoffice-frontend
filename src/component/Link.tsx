import React from 'react'
import { Link as RRDLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    link: { userSelect: 'none', textDecoration: 'none' },
})

export const Link = ({ ...props }) => {
    const classes = useStyles()

    return (
        <RRDLink className={classes.link} to={props.to} {...props}>
            {props.children}
        </RRDLink>
    )
}

export default Link
