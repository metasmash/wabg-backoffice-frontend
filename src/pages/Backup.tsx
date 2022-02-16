import React, { useEffect } from 'react'
import { Title } from '../component/Title'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { databaseSlice } from '../ducks/database/reducer'
import { selectBackups } from '../ducks/database/selector'
import { Button, Typography } from '@material-ui/core'

export const Backup = () => {
    const dispatch = useAppDispatch()
    const backups = useAppSelector(selectBackups)

    useEffect(() => {
        dispatch(databaseSlice.actions.getBackups())
    }, [])

    const handleCreateBackup = () => {}

    return (
        <div>
            <Title style={{ textAlign: 'center' }}>
                Récupération des données
            </Title>
            <Button
                onClick={handleCreateBackup}
                color="primary"
                style={{ marginBottom: 20 }}
                variant="contained"
            >
                Créer un backup
            </Button>
            {backups.map((backup, key) => (
                <React.Fragment key={key}>
                    <Typography>{backup}</Typography>
                </React.Fragment>
            ))}
        </div>
    )
}
