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
} from '@material-ui/core'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export default function DataTable({
    data,
    wrapCells = false,
    enableAction = false,
    handleEditRow,
}: {
    data: Array<any>
    wrapCells?: boolean
    enableAction?: boolean
    handleEditRow?: ({ payload }: { payload: any }) => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(0)
    const classes = useStyles()
    const keys = enableAction ? ['action', ..._.keys(data[0])] : _.keys(data[0])

    const handleOpenEditDialog = (selectedRow: number) => {
        setSelectedRow(selectedRow)
        setIsOpen(true)
    }

    const handleCloseEditDialog = () => {
        setIsOpen(false)
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

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <MuiTable className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {_.map(keys, (value: any, key: any) =>
                                key === 0 ? (
                                    <TableCell
                                        key={key}
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {value}
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                        key={key}
                                        align="right"
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
                                    value === 'action' ? (
                                        <TableCell
                                            key={key}
                                            component="th"
                                            scope="row"
                                        >
                                            <IconButton
                                                onClick={() => {
                                                    handleOpenEditDialog(
                                                        parentKey
                                                    )
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    ) : key === (enableAction ? 1 : 0) ? (
                                        <TableCell
                                            key={key}
                                            component="th"
                                            scope="row"
                                        >
                                            <div
                                                style={
                                                    wrapCells
                                                        ? {
                                                              width: '100%',
                                                              textOverflow:
                                                                  'ellipsis',
                                                              maxWidth: 100,
                                                              height: 200,
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
                                        <TableCell key={key} align="right">
                                            <div
                                                style={
                                                    wrapCells
                                                        ? {
                                                              width: '100%',
                                                              textOverflow:
                                                                  'ellipsis',
                                                              maxWidth: 100,
                                                              height: 200,
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
                    Editer une ligne
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitForm}>
                        {_.map(data[selectedRow], (x, key) => (
                            <div key={key}>
                                <div>{key}</div>
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
        </React.Fragment>
    )
}
