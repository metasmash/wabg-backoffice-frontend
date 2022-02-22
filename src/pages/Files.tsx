import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { getCurrentFiles } from '../ducks/files/selector'
import { filesSlice } from '../ducks/files/reducer'
import { push } from 'connected-react-router'
import { Typography } from '@material-ui/core'

export const Files = () => {
    const [selectedFile, setSelectedFile] = React.useState(null)
    const path = _.last(_.split(window.location.pathname, 'files'))
    const dispatch = useAppDispatch()
    const currentFiles = useAppSelector(getCurrentFiles)

    console.log(window.location.pathname)

    useEffect(() => {
        dispatch(filesSlice.actions.getFiles(path))
    }, [window.location.pathname])

    const handleFileSelect = (event: any) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        dispatch(filesSlice.actions.uploadFile({ file: selectedFile }))
    }

    return (
        <div>
            <Title style={{ textAlign: 'center' }}>
                Gestionnaire de fichiers: {path ? path : '/'}
            </Title>

            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} />
                <input type="submit" value="Upload File" />
            </form>
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
