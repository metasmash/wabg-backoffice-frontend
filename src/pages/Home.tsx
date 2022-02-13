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
                Bienvenue sur WABG Backoffice {username} !
            </Title>
            <Typography className={classes.typography}>
                Bon désolé du retard, c'est un peu tendu la vie en ce moment lol.
            </Typography>
            <Typography className={classes.typography}>
                Fonctionnalités disponnibles:

                - Editer du contenu
                - Ajouter des utilisateurs
                - Prévisualisation du site web avec rafraichissement automatique en cas de changements.

                Fonctionnalités à venir:
                - Gestionnaire de fichier (images)
                - Ajouter une nouvelle entrée sur une table de la base de donnée
                - Supprimer une entrée de la base de donnée
            </Typography>
        </div>
    )
}
