import React, { useState } from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppSelector } from '../ducks/root/hooks'
import { selectAllUsers, selectCurrentUser } from '../ducks/user/selector'
import { RoleType, userSlice } from '../ducks/user/reducer'
import DataTable from '../component/DataTable'
import { Button, Grid, IconButton, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Delete from '@material-ui/icons/Delete'

const useStyle = makeStyles({
    layout: {
        padding: '0px 30px 0px 30px',
    },
})

export const UsersPage = () => {
    const classes = useStyle()
    const [createUserData, setCreateUserData] = useState({
        username: '',
        password: '',
    })

    const { username: currentUserName, role: currentUserRole } = useAppSelector(
        selectCurrentUser
    )

    const dispatch = useDispatch()

    const users = useAppSelector(selectAllUsers)

    const superAdminUsers = _.filter(
        users,
        (user) => user.role === RoleType.SUPER_ADMIN
    )
    const adminUsers = _.filter(users, (user) => user.role === RoleType.ADMIN)

    const handleChangeCreateAdminData = (event: any) => {
        const { name, value } = event.target

        setCreateUserData((data) => ({
            ...data,
            [name]: value,
        }))
    }

    const handleCreateAdmin = () => {
        dispatch(userSlice.actions.createAdmin(createUserData))
    }

    const addActions = (users: any) =>
        _.map(users, (user) => ({
            ...user,
            action:
                user.username !== currentUserName ? (
                    <div>
                        <IconButton
                            onClick={() => {
                                dispatch(
                                    userSlice.actions.deleteUser(user.username)
                                )
                            }}
                        >
                            <Delete style={{ color: '#E8554E' }} />
                        </IconButton>
                    </div>
                ) : (
                    <div />
                ),
        }))

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleCreateAdmin()
        }
    }

    return (
        <div className={classes.layout}>
            <Title>Users page</Title>
            {!!superAdminUsers && (
                <>
                    <Title marginBottom={20}>Super admins</Title>
                    <div>
                        <DataTable data={superAdminUsers} />
                    </div>
                </>
            )}
            {!!adminUsers && (
                <>
                    <Title marginBottom={20}>Admins</Title>
                    <div>
                        <DataTable
                            data={
                                currentUserRole === RoleType.SUPER_ADMIN ||
                                RoleType.ADMIN
                                    ? addActions(adminUsers)
                                    : adminUsers
                            }
                        />
                    </div>
                    <Grid container style={{ marginTop: 30 }}>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                onKeyPress={handleKeyPress}
                                onChange={handleChangeCreateAdminData}
                                name="username"
                                id="username"
                                label="Nom d'utilisateur"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                onKeyPress={handleKeyPress}
                                onChange={handleChangeCreateAdminData}
                                name="password"
                                type="text"
                                id="password"
                                label="Mot de passe"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        style={{ marginTop: 10, marginBottom: 20 }}
                        onClick={handleCreateAdmin}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Créer un utilisateur
                    </Button>
                </>
            )}
        </div>
    )
}
