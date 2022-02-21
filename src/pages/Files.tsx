import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { getCurrentFiles } from '../ducks/files/selector'
import { filesSlice } from '../ducks/files/reducer'
import { push } from 'connected-react-router'
import { Typography } from '@material-ui/core'

export const Files = () => {
    const path = _.last(_.split(window.location.pathname, 'files'))
    const dispatch = useAppDispatch()
    const currentFiles = useAppSelector(getCurrentFiles)
    console.log(window.location.pathname)
    useEffect(() => {
        dispatch(filesSlice.actions.getFiles(path))
    }, [window.location.pathname])

    return (
        <div>
            <Title style={{ textAlign: 'center' }}>
                Gestionnaire de fichiers: {path ? path : '/'}
            </Title>
            <div>
                {_.map(currentFiles, (file, key) => (
                    <Typography
                        style={{ cursor: 'pointer' }}
                        key={key}
                        onClick={() => {
                            dispatch(push('/files' + file))
                        }}
                    >
                        {file}
                    </Typography>
                ))}
            </div>
        </div>
    )
}
