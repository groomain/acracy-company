import React, {useEffect, useRef, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {styles} from './style';
import CircleImage from "../../components/CircleImage";
import RevealProfil from "../../components/RevealProfil";
import acracy from "../../assets/icons/logo-acracy-a.svg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {useScrollPosition} from '@n8tb1t/use-scroll-position'
import {logoutLaunched} from "../../components/App/reducer";
import {useDispatch, useSelector} from "react-redux";
import {getSelectionProfilLaunched} from "./reducer";

const ProfileSelection = (props) => {
    const classes = styles();
    const dispatch = useDispatch();

    let profils = [1,2,3,4];

    const [elementPosition, setElementPosition] = useState({ x: 10, y: 150 });
    const [elementHeight, setElementHeight] = useState(0);
    const heightRef = useRef();
    const elementsRef = useRef();

    useScrollPosition(
        ( ) => {
            const currPos = heightRef.current.getBoundingClientRect().height;
            setElementHeight(currPos)
        }, [], heightRef
    );

    useScrollPosition(
        ({ currPos }) => {
            setElementPosition(currPos)
        }, [], elementsRef
    );

    const getSelectionProfil = () => {
        dispatch(getSelectionProfilLaunched());
    };

    const { selectionProfilData } = useSelector(state => ({
        selectionProfilData: state.getIn(['SelectionProfil', 'selectionProfilData'])
    }));

    useEffect(() => {
        getSelectionProfil()
    }, []);

    console.log("selectionProfilData", selectionProfilData);

    return (
            <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
                <Grid
                    container
                    justify="center"
                    direction="row"
                    className={classes.container}
                >

                    <Grid item container xs={3} direction={'row'} justify="center" alignItems="flex-start"
                          >
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={{[classes.avatar]: elementPosition.y > 350 || null}}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Recommandation globale"/>
                            </ListItem>
                            {profils.map((profil, index) =>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={{[classes.avatar]: elementPosition.y < 350-(index*elementHeight/profils.length) && elementPosition.y > 350-((index+1)*elementHeight/profils.length)}}>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Anh-Dao"/>
                                </ListItem>
                            )}
                            {/*<ListItem>*/}
                            {/*<ListItemAvatar>*/}
                            {/*<Avatar className={{[classes.avatar]: elementPosition.y < 150}}>*/}
                            {/*</Avatar>*/}
                            {/*</ListItemAvatar>*/}
                            {/*<ListItemText secondaryTypographyProps={{color: 'white'}} primary="Vacation"*/}
                            {/*secondary="July 20, 2014"/>*/}
                            {/*</ListItem>*/}
                        </List>
                    </Grid>



                    <Grid item container xs={6} className={classes.middleContainer} direction="column">
                        <Grid item container direction="column" className={classes.firstMiddleContainer}>
                        <Typography className={classes.mainTitle}>Il est temps de faire votre sélection !</Typography>
                        <Typography variant={'h2'}>Le mot d'acracy</Typography>
                        <Typography className={classes.word}>Quae fuerit causa, mox videro; interea hoc epicurus in
                            bonis sit id, de voluptate ponit, quod maxime placeat, facere nondum depravatum ipsa natura
                            incorrupte atque admonitionem altera prompta et quas molestias excepturi sint, obcaecati
                            cupiditate non provident, similique sunt.</Typography>
                        <Grid container direction={'row'} alignItems={'center'} className={classes.authorContainer}>
                            <CircleImage/>
                            <Typography variant="body2" className={classes.authorTypo}>Séverine, Chief
                                TalentOfficier</Typography>
                        </Grid>
                        </Grid>
                        <div ref={elementsRef}>
                            <div ref={heightRef}>
                                {profils.map((profil, i) =>
                                    <RevealProfil />
                                )}
                            </div>
                        </div>
                    </Grid>



                    <Grid item container xs={3}>
                        <Grid item container direction={'column'} className={classes.card}>
                            <Typography variant={'h3'} className={classes.cardTitle}>Faites votre choix</Typography>
                            <Typography variant={'body1'}>Cliquez sur ce bouton *** pour pré-selectionner un ou
                                plusieurs profils. Vous
                                pourrez ensuite valider votre selection ou réaliser un/des entretien.s.</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.logoAcracyContainer}>
                    <img src={acracy} alt="acracy" className={classes.logoAcracy}/>
                </Grid>
            </Grid>

    );
};
export default ProfileSelection;
