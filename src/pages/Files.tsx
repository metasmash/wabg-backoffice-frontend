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
import { Link } from '../component'

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
        dispatch(filesSlice.actions.uploadFile({ file: selectedFile, path }))
    }

    const handleGoBack = () => {
        history.goBack()
    }

    const isFileFoolder = (file: string) => _.last(_.split(file, '')) === '/'

    return (
        <div>
            <IconButton onClick={handleGoBack}>
                <ArrowBack style={{ fontSize: 40 }} />
            </IconButton>
            <Title style={{ textAlign: 'center' }}>
                Gestionnaire de fichiers: {path}
            </Title>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} />
                <input type="submit" value="Upload File" />
            </form>
            <div>
                {_.map(currentFiles, (file, key) => (
                    <Typography key={key}>
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
                    </Typography>
                ))}
            </div>
        </div>
    )
}
