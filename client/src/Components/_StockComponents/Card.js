import React from 'react';
import def from "../../images/def.jpg";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallMade from '@material-ui/icons/CallMade';

import { Row, Column, Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { Button } from '@material-ui/core';

const StyledTooltip = withStyles({
  tooltip: {
    marginTop: '0.2rem',
    backgroundColor: 'rgba(0,0,0,0.72)',
    color: '#fff',
  },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    borderRadius: 8,
    backgroundColor: '#495869',
  },
  overline: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8D9CAD',
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: '#495869',
  },
}));

const BasicProfile = props => {
  return (
    <Row {...props}>
      <Item>
        <Button variant="contained" color="primary">Commander</Button>
      </Item>
    </Row>
  );
};

const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: '1.25rem',
    color: '#122740',
  },
  subheader: {
    fontSize: '0.875rem',
    color: '#495869',
  },
}));

const CardHeader = props => {
  const styles = useCardHeaderStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  return (
    <Row {...props}>
      <Item position={'middle'}>
        <Typography className={styles.title}>
          <b>{props.data.libelle}</b>
        </Typography>
        <br />
        <Typography className={styles.subheader}>
          <b>Prix : </b>{' ' + props.data.prix.toFixed(3) + " DT"}
        </Typography>
        <Typography className={styles.subheader}>
          <b>Quantité vendu : </b>{" " + props.data.quantite_vendu}
        </Typography>
      </Item>
      <Item position={'right'} mr={-0.5}>
        <StyledTooltip title={'See details'}>
          <IconButton classes={iconBtnStyles}>
            <CallMade />
          </IconButton>
        </StyledTooltip>
      </Item>
    </Row>
  );
};

export const Card = React.memo(function ShowcaseCard(props) {
  return (
    <Grid container spacing={4} justify={'center'}>
        <Grid item xs={5}>
            <Item grow>
              <img src={props.data.image !== "NULL" ? props.data.image : def} style={{width:"16em",height:"13em"}}></img>
            </Item>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
            <Column>
              <CardHeader data={props.data} />
              <br /><br />
              <BasicProfile position={'bottom'} data={props.data} />
            </Column>
        </Grid>
    </Grid>
  );
});

export default Card