import React from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppSelector } from '../ducks/root/hooks'
import { selectAllUsers } from '../ducks/user/selector'
import { RoleType } from '../ducks/user/reducer'

export const UsersPage = () => {
    const users = useAppSelector(selectAllUsers)
    const superAdminUsers = _.filter(
        users,
        (user) => user.role === RoleType.SUPER_ADMIN
    )
    const adminUsers = _.filter(users, (user) => user.role === RoleType.ADMIN)

    return (
        <div>
            <Title>Users page</Title>
            {!!superAdminUsers && (
                <>
                    <Title>Super admins</Title>
                    {_.map(superAdminUsers, (user) => (
                        <div>{user.username}</div>
                    ))}
                </>
            )}
            {!!superAdminUsers && (
                <>
                    <Title>Admins</Title>
                    {_.map(adminUsers, (user) => (
                        <div>{user.username}</div>
                    ))}
                </>
            )}
        </div>
    )
}
