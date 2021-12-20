import React from 'react'
import _ from 'lodash'
import { Title } from '../component/Title'
import { useAppSelector } from '../ducks/root/hooks'
import { selectAllUsers } from '../ducks/user/selector'
import { RoleType } from '../ducks/user/reducer'
import DataTable from '../component/DataTable'

export const UsersPage = () => {
    const users = useAppSelector(selectAllUsers)
    const superAdminUsers = _.filter(
        users,
        (user) => user.role === RoleType.SUPER_ADMIN
    )
    const adminUsers = _.filter(users, (user) => user.role === RoleType.ADMIN)
    console.log(superAdminUsers)
    return (
        <div>
            <Title>Users page</Title>
            {!!superAdminUsers && (
                <>
                    <Title marginBottom={20}>Super admins</Title>
                    <div>
                        <DataTable data={superAdminUsers} />
                    </div>
                </>
            )}
            {!!superAdminUsers && (
                <>
                    <Title marginBottom={20}>Admins</Title>
                    <DataTable data={adminUsers} />
                </>
            )}
        </div>
    )
}
