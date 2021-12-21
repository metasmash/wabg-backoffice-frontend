import React from 'react'
import _ from 'lodash'
import { Grid } from '@material-ui/core'
import { useAppSelector } from '../ducks/root/hooks'
import { selectTables } from '../ducks/database/selector'
import { TableButton } from '../component/TableButton'
import { Title } from '../component/Title'

export const TablesPage = () => {
    const tables = useAppSelector(selectTables)

    return (
        <div>
            <Title style={{ textAlign: 'center' }}>Editer une table</Title>
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
                            <TableButton to={`/tables/${table}`}>
                                {table}
                            </TableButton>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}
