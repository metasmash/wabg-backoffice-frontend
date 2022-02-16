import React from 'react'
import { Title } from '../component/Title'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAppSelector } from '../ducks/root/hooks'
import { selectCurrentUser } from '../ducks/user/selector'
import { Notification } from '../component/Notification'

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
                Bienvenue sur WABG Backoffice {username} !
            </Title>
            <Typography
                style={{ marginBottom: 20 }}
                className={classes.typography}
            >
                Bon désolé du retard, c'est un peu tendu la vie en ce moment
                lol.
            </Typography>
            <Typography
                style={{ fontWeight: 600 }}
                component={'div'}
                className={classes.typography}
            >
                Fonctionnalités disponnibles:
            </Typography>

            <Typography component={'div'} className={classes.typography}>
                - Editer du contenu
            </Typography>
            <Typography component={'div'} className={classes.typography}>
                - Ajouter des utilisateurs
            </Typography>
            <Typography component={'div'} className={classes.typography}>
                - Prévisualisation du site web avec rafraichissement automatique
                en cas de changements
            </Typography>
            <Typography
                style={{ marginBottom: 20 }}
                component={'div'}
                className={classes.typography}
            >
                - Supprimer une entrée de la base de donnée
            </Typography>
            <Typography
                style={{ fontWeight: 600 }}
                component={'div'}
                className={classes.typography}
            >
                Fonctionnalités à venir:
            </Typography>
            <Typography component={'div'} className={classes.typography}>
                - Gestionnaire de fichier (images)
            </Typography>
            <Typography component={'div'} className={classes.typography}>
                - Ajouter une nouvelle entrée sur une table de la base de donnée
            </Typography>
            <Typography component={'div'} className={classes.typography}>
                - Système de sauvegarde et de restauration de base de donnée
            </Typography>
        </div>
    )
}
