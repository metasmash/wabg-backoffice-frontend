import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppDispatch, useAppSelector } from '../ducks/root/hooks'
import { getCurrentFiles } from '../ducks/files/selector'
import { filesSlice } from '../ducks/files/reducer'
import { push } from 'connected-react-router'
import { IconButton, Typography } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import ArrowBack from '@material-ui/icons/ArrowBack'
import FolderIcon from '@material-ui/icons/Folder'

export const Files = () => {
    const history = useHistory()
    const [selectedFile, setSelectedFile] = React.useState(null)
    const location = useLocation()
    const path = _.last(_.split(location.pathname, 'files')) || '/'
    const isRootPath = path === '/'
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
        if (!!selectedFile) {
            dispatch(
                filesSlice.actions.uploadFile({ file: selectedFile, path })
            )
        }
    }

    const handleGoBack = () => {
        history.goBack()
    }

    const handleDeleteFile = (path: string) => {
        dispatch(filesSlice.actions.deleteFile({ path }))
    }

    const isFileFoolder = (file: string) => _.split(file, '.').length === 1

    return (
        <div>
            <IconButton onClick={handleGoBack}>
                <ArrowBack style={{ fontSize: 40 }} />
            </IconButton>
            <Title style={{ textAlign: 'center' }}>
                Gestionnaire de fichiers: {path}
            </Title>
            <form style={{ marginBottom: 10 }} onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} />
                <input type="submit" value="Upload File" />
            </form>
            <div>
                {_.map(currentFiles, (file, key) => (
                    <Typography
                        key={key}
                        style={{
                            border: 'solid 1px #ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            background: Boolean(key % 2)
                                ? '#f3ff8520'
                                : '#faff2320',
                        }}
                    >
                        {isFileFoolder(file) && <FolderIcon color="primary" />}
                        <span
                            style={{
                                width: 'auto',
                                ...(isFileFoolder(file)
                                    ? { cursor: 'pointer' }
                                    : {}),
                            }}
                            onClick={() => {
                                if (isFileFoolder(file)) {
                                    dispatch(push('/files' + file))
                                }
                            }}
                        >
                            {isRootPath ? file : _.last(_.split(file, path))}
                        </span>
                        {!isFileFoolder(file) && (
                            <span
                                onClick={() => {
                                    handleDeleteFile(file)
                                }}
                                style={{ color: 'red', cursor: 'pointer' }}
                            >
                                Supprimer
                            </span>
                        )}
                    </Typography>
                ))}
            </div>
        </div>
    )
}
