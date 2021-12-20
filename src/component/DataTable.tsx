import React from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export default function DataTable({ data }: { data: Array<any> }) {
    const classes = useStyles()
    const keys = _.keys(data[0])

    console.log(keys)

    return (
        <TableContainer component={Paper}>
            <MuiTable className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {_.map(keys, (value: any, key: any) =>
                            key === 0 ? (
                                <TableCell style={{ fontWeight: 'bold' }}>
                                    {value}
                                </TableCell>
                            ) : (
                                <TableCell
                                    style={{ fontWeight: 'bold' }}
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
                    {_.map(data, (row, key) => (
                        <TableRow key={key}>
                            {keys.map((value, key) =>
                                key === 0 ? (
                                    <TableCell
                                        key={key}
                                        component="th"
                                        scope="row"
                                    >
                                        {row[keys[key]]}
                                    </TableCell>
                                ) : (
                                    <TableCell key={key} align="right">
                                        {row[keys[key]]}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}
