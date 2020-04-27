import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(theme => ({
  container: {
    height: '100vh'
  },
  large: {
    width: 150,
    height: 150,
  },
  leftContainer: {
    width: '50%',
    marginBottom: '10%'
  },
  rightContainer: {
    width: '50%',
    height: '100%',
    backgroundImage: `url(${'https://image.noelshack.com/fichiers/2020/17/7/1587896571-fceafe.jpeg'})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 1210,
    opacity: 0.7
  },
  linkListeAccount: {
    marginBottom: 50
  }
}));
