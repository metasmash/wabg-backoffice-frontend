import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    deleteButton: {
        height: 50,
        background: '#E8554E',
        color: 'white',
        width: '40%',
        margin: 10,
        '&:hover': {
            background: '#AB2A26',
        },
    },
})

interface useDeleteDialogProps {
    title: string
    description: string
    importantDescription?: string
    confirmCallback: () => void
}

export const useDeleteDialog = ({
    title,
    description,
    confirmCallback,
    importantDescription = '',
}: useDeleteDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const classes = useStyles()

    const handleCloseDeleteDialog = () => {
        setIsOpen(false)
    }

    const handleOpenDeleteDialog = () => {
        setIsOpen(true)
    }

    const handleConfirm = () => {
        handleCloseDeleteDialog()
        confirmCallback()
    }

    return {
        handleCloseDeleteDialog,
        handleOpenDeleteDialog,
        DeleteDialog: (
            <Dialog open={isOpen}>
                <IconButton
                    onClick={handleCloseDeleteDialog}
                    style={{ position: 'absolute', top: 5, right: 5 }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogTitle style={{ width: 500 }}>
                    <Typography style={{ fontSize: 30 }}>{title}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>{description}</Typography>
                    <Typography
                        style={{
                            marginTop: 20,
                            color: '#AB2A26',
                            fontWeight: 600,
                        }}
                        component="div"
                    >
                        {importantDescription}
                    </Typography>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: 50,
                        }}
                    >
                        <Button
                            style={{
                                height: 50,
                                color: 'white',
                                width: '40%',
                                margin: 10,
                            }}
                            color="primary"
                            variant={'contained'}
                            onClick={handleCloseDeleteDialog}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            className={classes.deleteButton}
                            variant={'contained'}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        ),
    }
}
