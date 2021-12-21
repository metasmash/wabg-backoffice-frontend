import React from 'react'
import { Title } from '../component/Title'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAppSelector } from '../ducks/root/hooks'
import { selectCurrentUser } from '../ducks/user/selector'

const useStyle = makeStyles({
    typography: {
        fontSize: 18,
    },
})

export const Home = () => {
    const classes = useStyle()
    const { username } = useAppSelector(selectCurrentUser)
    return (
        <div>
            <Title style={{ textAlign: 'center' }}>
                Bienvenue sur WABG Backoffice: {username} !
            </Title>
            <Typography className={classes.typography}>
                Le backoffice est en travaux.
            </Typography>
            <Typography className={classes.typography}>
                Il vous permettra de gérer vos utilisateurs et accès ainsi que
                de gérer votre site internet. Si vous souhaitez avoir un certain
                type d'utilisateur avec des droits spécifiques, ou d'autres
                fonctionnalités, merci d'en parler au SUPER ADMIN.
            </Typography>
        </div>
    )
}
