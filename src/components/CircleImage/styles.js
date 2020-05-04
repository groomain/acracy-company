import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    avatar: {
        backgroundBlendMode: 'hue',
        backgroundImage: 'linear-gradient(to bottom, #000000, #000000)',
        filter: 'saturate(0)',
        backgroundColor: '#162217'
    },
    avatarLarge: {
        width: '123px',
        height: '122px'
    },
    avatarSmall: {
        width: '50px',
        height: '50px'
    },
}));