import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    progressBar: props => (
        {
        height: 10,
        width: props.width,
        backgroundColor: 'yellow',
        position: 'fixed',
        top: theme.navbar.height,
        transition: 'width 2s',
        zIndex: 2
    })
}));
