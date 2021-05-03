import React from 'react'
import Profits from '../_StatistiquesComponents/Profits'
import StatAppBar from '../_StatistiquesComponents/StatAppBar'
import StatistiquesPreleminaire from '../_StatistiquesComponents/StatistiquesPreleminaire'

function Statistiques() {
    return (
        <div>
            <StatAppBar />
            <Profits />
            <StatistiquesPreleminaire />
        </div>
    )
}

export default Statistiques
