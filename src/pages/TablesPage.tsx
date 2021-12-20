import React from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { authSlice } from '../ducks/auth/reducer'
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { useAppSelector } from '../ducks/root/hooks'
import { selectTables } from '../ducks/database/selector'
import { TableButton } from '../component/TableButton'
import { Title } from '../component/Title'

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        borderRadius: '0% 0% 20px 20px',
        padding: '30px 30px 70px 30px',
        marginBottom: 50,
    },
})

export const TablesPage = () => {
    const classes = useStyles()
    const tables = useAppSelector(selectTables)
    const dispatch = useDispatch()

    return (
        <div>
            <Title> Présentation des tables </Title>
            <Grid container>
                {_.map(tables, (table, key) => {
                    return (
                        <Grid
                            key={key}
                            style={{ marginBottom: 20 }}
                            item
                            sm={6}
                            md={3}
                        >
                            <TableButton> {table}</TableButton>
                        </Grid>
                    )
                })}
            </Grid>
            <iframe
                style={{ width: '100%', height: 600 }}
                src={'https://www.wabg-avocats.fr/associationspro.php'}
            />
        </div>
    )
}
