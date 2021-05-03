import { makeStyles } from '@material-ui/core'
import React from 'react'
import Profits from '../_StatistiquesComponents/Profits'
import StatAppBar from '../_StatistiquesComponents/StatAppBar'
import StatistiquesPreleminaire from '../_StatistiquesComponents/StatistiquesPreleminaire'

const useStyles = makeStyles((theme) => ({
	root: {
		
        backgroundColor:'#f7f7f7'
	},
}));

function Statistiques() {
    const classes=useStyles();
    return (
        <div className={classes.root}>
            <StatAppBar />
            <Profits />
            <StatistiquesPreleminaire />
        </div>
    )
}

export default Statistiques
