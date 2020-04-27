import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { CustomButton } from '../../components/Button';
import { styles } from './style';
import ButtonGroup from "@material-ui/core/ButtonGroup";

const MyAccount = (props) => {
  const preventDefault = event => event.preventDefault();
  const classes = styles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="row"
      className={classes.container}
    >
      <Grid item className={classes.leftContainer}>
        <div style={{ width: '40%', textAlign: 'left', marginLeft: '30%' }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
          <Typography variant="subtitle1">La Pilule Rouge</Typography>
          <Typography variant="body2">165 Avenue de Bretagne, Euratechnologies, 59000 Lille</Typography>
          <Typography variant="body1"> ID: LAPILULEROUGE587</Typography>
          <Typography variant="body1">Contact référent:</Typography>
          <Typography variant="body2">Paul Personne</Typography>
          <Typography variant="body1">Directeur des ressources humaines</Typography>
          <Typography variant="body1">Mutuelle d`entreprise</Typography>
          <Typography variant="body2">Nom de la mutuelle XXXXX</Typography>
        </div>
      </Grid>
      <Grid item className={classes.rightContainer}>
        <div style={{ textAlign: 'center', marginTop: '40vh' }}>
          <ButtonGroup orientation="vertical">
            <CustomButton variant="outlined" color="primary" title={'Inviter des collaborateurs'} />
            <Typography className={classes.linkListeAccount}>
              <Link href="/" variant="caption" onClick={preventDefault}>
                Voir la liste
            </Link>
            </Typography>
            <CustomButton variant="outlined" color="primary" title={'Historique'} />
          </ButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
};
export default MyAccount;
