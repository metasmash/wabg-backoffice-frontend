import React, { useEffect } from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { databaseSlice } from '../ducks/database/reducer'
import { selectBackups } from '../ducks/database/selector'
import { Button, Typography } from '@material-ui/core'
import moment from 'moment'

export const Backup = () => {
    const dispatch = useAppDispatch()
    const backups = useAppSelector(selectBackups)

    useEffect(() => {
        dispatch(databaseSlice.actions.getBackups())
    }, [])

    const handleCreateBackup = () => {
        dispatch(databaseSlice.actions.saveBackup())
    }

    const getDateFromBackup = (backup: string) =>
        moment(_.toNumber(_.first(_.split(backup, '.')))).format(
            'MM/DD/YYYY hh:mm:ss'
        )

    const handleLoadBackup = (backup: string) => {
        dispatch(databaseSlice.actions.loadBackup(backup))
    }

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
                <div
                    key={key}
                    style={{
                        background: '#ffffe080',
                        marginBottom: 5,
                        display: 'flex',
                        border: 'solid #50505080 1px',
                        justifyContent: 'space-between',
                        padding: '1px 5px',
                    }}
                >
                    <div>
                        <Typography>{backup}</Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            {getDateFromBackup(backup)}
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            onClick={() => {
                                handleLoadBackup(backup)
                            }}
                            style={{
                                cursor: 'pointer',
                                fontWeight: 600,
                                color: '#102090f0',
                            }}
                        >
                            Charger
                        </Typography>
                    </div>
                </div>
            ))}
        </div>
    )
}
