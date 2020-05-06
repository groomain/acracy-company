import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    sidebarDiv: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.sidebarGreen,
        minHeight: '100vh'
    },
    formGridItem: {
        paddingTop: '10vh'
    },
    marginTop: {
        marginTop: 30
    },
    stepper: {
        backgroundColor: theme.palette.secondary.black,
        padding: '16px 0'
    },
    // step: {
    //   color: theme.palette.secondary.main
    // },
    stepButton: {
        width: '160px',
        '&inactive': {
            color: 'orange',
            backgroundColor: 'orange'
        },
    },
    // stepIcon: {
    //   border: 'solid 1px red',
    //   padding: 0,
    //   // width: '22px',
    //   // height: '30px',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    iconContainer: {
        border: 'solid 1px white',
    },
    //   borderRadius: '50%',
    //   padding: 0,
    //   // width: '22px',
    //   // height: '30px',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // circle: {
    //   width: 49,
    //   height: 49,
    //   borderRadius: '50%',
    //   outlineOffset: '4px solid red',
    //   outline: 10,
    // },
    signupRows: {
        paddingTop: theme.spacing(2)
    }
}));
