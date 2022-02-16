import React, { useState } from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
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

export default function DataTable({
    data,
    wrapCells = false,
    enableAction = false,
    handleEditRow,
    handleDeleteRowById,
}: {
    data: Array<any>
    wrapCells?: boolean
    enableAction?: boolean
    handleEditRow?: ({ payload }: { payload: any }) => void
    handleDeleteRowById?: ({ index }: { index: number }) => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(0)

    const classes = useStyles()
    const keys = enableAction ? ['editer', ..._.keys(data[0])] : _.keys(data[0])

    const handleOpenEditDialog = (selectedRow: number) => {
        setSelectedRow(selectedRow)
        setIsOpen(true)
    }

    const handleCloseEditDialog = () => {
        setIsOpen(false)
    }

    const handleOpenDeleteDialog = (selectedRow: number) => {
        setSelectedRow(selectedRow)
        setIsDeleteDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false)
    }

    const handleSubmitForm = (e: any) => {
        e.preventDefault()
        const payload = _.reduce(
            _.filter(
                _.map(e.target, (x) =>
                    x.name !== '' ? { [x.name]: x.value } : undefined
                ),
                (x: any) => !_.isUndefined(x)
            ),
            (final: any, current: any) => ({ ...final, ...current }),
            {}
        )
        if (handleEditRow) {
            handleEditRow({ payload })
            handleCloseEditDialog()
        }
    }

    const handleDelete = () => {
        if (handleDeleteRowById) {
            handleDeleteRowById({ index: selectedRow })
            handleCloseDeleteDialog()
        }
    }

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <MuiTable className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {_.map(keys, (value: any, key: any) =>
                                key === keys.length - 1 ? (
                                    <TableCell
                                        key={key}
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                        align="left"
                                    >
                                        {value}
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                        key={key}
                                        align="left"
                                    >
                                        {value}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(data, (row, parentKey) => (
                            <TableRow key={parentKey}>
                                {keys.map((value, key) =>
                                    value === 'editer' ? (
                                        <TableCell
                                            key={key}
                                            component="th"
                                            scope="row"
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <IconButton
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    onClick={() => {
                                                        handleOpenEditDialog(
                                                            parentKey
                                                        )
                                                    }}
                                                >
                                                    <EditIcon
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                        }}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    onClick={() => {
                                                        handleOpenDeleteDialog(
                                                            parentKey
                                                        )
                                                    }}
                                                >
                                                    <Delete
                                                        style={{
                                                            color: '#E8554E',
                                                            width: 30,
                                                            height: 30,
                                                        }}
                                                    />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    ) : key === (enableAction ? 1 : 0) ? (
                                        <TableCell
                                            key={key}
                                            component="th"
                                            scope="row"
                                            align="left"
                                        >
                                            <div
                                                style={
                                                    wrapCells
                                                        ? {
                                                              width: '100%',
                                                              textOverflow:
                                                                  'ellipsis',
                                                              maxWidth: 100,
                                                              height: 100,
                                                              overflow:
                                                                  'hidden',
                                                          }
                                                        : {}
                                                }
                                            >
                                                {row[keys[key]]}
                                            </div>
                                        </TableCell>
                                    ) : (
                                        <TableCell key={key} align="left">
                                            <div
                                                style={
                                                    wrapCells
                                                        ? {
                                                              textOverflow:
                                                                  'ellipsis',
                                                              maxWidth: 100,
                                                              height: 100,
                                                              overflow:
                                                                  'hidden',
                                                          }
                                                        : {}
                                                }
                                            >
                                                {row[keys[key]]}
                                            </div>
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <Dialog open={isOpen}>
                <IconButton
                    onClick={handleCloseEditDialog}
                    style={{ position: 'absolute', top: 5, right: 5 }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogTitle style={{ width: 500 }}>
                    <Typography style={{ fontSize: 30 }}>
                        Editer une ligne
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitForm}>
                        {_.map(data[selectedRow], (x, key) => (
                            <div key={key}>
                                <Typography>{key}</Typography>
                                <TextField
                                    name={key}
                                    multiline
                                    defaultValue={x}
                                    fullWidth
                                    style={{ marginBottom: 20 }}
                                />
                            </div>
                        ))}
                        <Button
                            style={{ marginTop: 30, height: 50 }}
                            fullWidth
                            color={'primary'}
                            variant={'contained'}
                            type="submit"
                        >
                            Envoyer
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen}>
                <IconButton
                    onClick={handleCloseDeleteDialog}
                    style={{ position: 'absolute', top: 5, right: 5 }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogTitle style={{ width: 500 }}>
                    <Typography style={{ fontSize: 30 }}>
                        Supprimer une ligne
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Attention! Vous êtes sur le point de supprimer
                        définitivement une ligne de la base de donnée. Êtes-vous
                        sûr de votre choix?
                    </Typography>
                    <Typography
                        style={{
                            marginTop: 20,
                            color: '#AB2A26',
                            fontWeight: 600,
                        }}
                        component="div"
                    >
                        Veuillez noter que supprimer une entrée peut altérer le
                        comportement d'autres tables!!!
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
                            onClick={handleDelete}
                            className={classes.deleteButton}
                            variant={'contained'}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}
