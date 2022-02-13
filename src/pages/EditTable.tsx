import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Title } from '../component/Title'
import { useDispatch, useSelector } from 'react-redux'
import { databaseSlice } from '../ducks/database/reducer'
import {
    selectCurrentTable,
    selectIsDatabaseLoading,
} from '../ducks/database/selector'
import DataTable from '../component/DataTable'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { Link } from '../component'
import { routes } from '../constants'

const TableIds = {
    associations: 'id_associations',
    correspondants: 'id_correspondants',
    droitaffaires: 'id_affaires',
    droitenvironnement: 'id_environnement',
    droitimmobilier: 'id_immobilier',
    droitpersonnes: 'id_personnes',
    droitprofessionslib: 'id_professionslib',
    droitrural: 'id_rural',
    droitsocial: 'id_social',
    droitvoiesexecution: 'id_voies',
    equipe: 'id_equipe',
    honoraires: 'id_honoraires',
    partenaires: 'id_partenaires',
    poles: 'id_poles',
    presse: 'id_presse',
    responsabilitecivile: 'id_responsabilite',
    revues: 'id_revues',
    videos: 'id_videos',
}

const tables = [
    {
        name: 'associations',
        src: 'https://www.wabg-avocats.fr/associationspro.php',
    },
    {
        name: 'correspondants',
        src: 'https://www.wabg-avocats.fr/correspondants.php',
    },
    {
        name: 'droitaffaires',
        src: 'https://www.wabg-avocats.fr/droitaffaires.php',
    },
    {
        name: 'droitenvironnement',
        src: 'https://www.wabg-avocats.fr/droitenvironnement.php',
    },
    {
        name: 'droitimmobilier',
        src: 'https://www.wabg-avocats.fr/droitimmobilier.php',
    },
    {
        name: 'droitpersonnes',
        src: 'https://www.wabg-avocats.fr/droitpersonnes.php',
    },
    {
        name: 'droitprofessionslib',
        src: 'https://www.wabg-avocats.fr/droitprofessions.php',
    },
    {
        name: 'droitrural',
        src: 'https://www.wabg-avocats.fr/droitrural.php',
    },
    {
        name: 'droitsocial',
        src: 'https://www.wabg-avocats.fr/droitsocial.php',
    },
    {
        name: 'droitvoiesexecution',
        src: 'https://www.wabg-avocats.fr/droitexecution.php',
    },
    {
        name: 'equipe',
        src: 'https://www.wabg-avocats.fr/notreequipe.php',
    },
    {
        name: 'honoraires',
        src: 'https://www.wabg-avocats.fr/honoraires.php',
    },
    {
        name: 'partenaires',
        src: 'https://www.wabg-avocats.fr/partenaires.php',
    },
    {
        name: 'poles',
        src: 'https://www.wabg-avocats.fr/domaines.php',
    },
    {
        name: 'presse',
        src: 'https://www.wabg-avocats.fr/revues.php',
    },
    {
        name: 'responsabilitecivile',
        src: 'https://www.wabg-avocats.fr/droitresponsabilite.php',
    },
    {
        name: 'revues',
        src: 'https://www.wabg-avocats.fr/revues.php',
    },
    {
        name: 'videos',
        src: 'https://www.wabg-avocats.fr/videos.php',
    },
]

export const EditTable = () => {
    const [refreshIframe, setRefreshIframe] = useState(0)

    const dispatch = useDispatch()
    const currentTable = useSelector(selectCurrentTable)
    const isLoading = useSelector(selectIsDatabaseLoading)

    const params: any = useParams()

    const { tableName } = params

    const getIframeSrc = (tableName: string) =>
        _.get(
            _.find(tables, ({ name }) => name === tableName),
            'src'
        )

    useEffect(() => {
        dispatch(databaseSlice.actions.getTableByName(tableName))
    }, [])

    const handleRefreshIframe = () => {
        setRefreshIframe((x) => x + 1)
    }

    const handleEditRow = ({
        payload,
    }: {
        payload: { [key: string]: any }
    }) => {
        const idName = _.get(TableIds, tableName)
        const id = _.get(payload, idName)
        dispatch(
            databaseSlice.actions.editTable({
                id,
                tableName,
                newValues: payload,
                idName,
            })
        )
        handleRefreshIframe()
    }

    return (
        <div>
            <div style={{ position: 'absolute' }}>
                <Link to={routes.TABLES}>
                    <IconButton>
                        <ArrowBack style={{ fontSize: 40 }} />
                    </IconButton>
                </Link>
            </div>
            <Title style={{ textAlign: 'center' }}>
                Editer une table: {tableName}
            </Title>
            {!!currentTable && !isLoading && (
                <DataTable
                    handleEditRow={handleEditRow}
                    data={currentTable}
                    wrapCells
                    enableAction
                />
            )}
            {!!getIframeSrc(tableName) && (
                <iframe
                    key={refreshIframe}
                    style={{ width: '100%', height: 600 }}
                    src={getIframeSrc(tableName)}
                />
            )}
        </div>
    )
}
