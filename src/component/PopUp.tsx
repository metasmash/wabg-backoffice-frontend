import React, { useEffect, useState } from 'react'
import { IconButton, Snackbar, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

interface PopUpProps {
    message: string
    onCloseCallback?: () => void
    duration?: number
}

export const PopUp = ({
    message,
    onCloseCallback = () => {},
    duration = 3000,
}: PopUpProps) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(Boolean(message))
    }, [message])

    const handleClosePopUp = (event: any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        onCloseCallback()
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClosePopUp}
            autoHideDuration={duration}
            message={<Typography>{message}</Typography>}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClosePopUp}
                >
                    <Close fontSize="small" />
                </IconButton>
            }
        />
    )
}
