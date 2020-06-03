import React, {useMemo, useRef, useState} from 'react';
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

// const PositionStore = () => {
//     const [renderCount, triggerReRender] = useState(0)
//     const elementPosition = useRef({x: 10, y: 150})
//     const viewportPosition = useRef({x: 0, y: 0})
//     let throttleTimeout = null
//
//     const getPos = (el, axis) => Math.round(el.current[axis])
//
//     const setPos = (el, pos) => {
//         el.current = pos
//         if (throttleTimeout !== null) return
//         // Only re-render the component every 0.1s
//         throttleTimeout = setTimeout(() => triggerReRender(renderCount + 1), 300)
//     }
//
//     return {
//         getElementX: () => getPos(elementPosition, 'x'),
//         getElementY: () => getPos(elementPosition, 'y'),
//         getViewportX: () => getPos(viewportPosition, 'x'),
//         getViewportY: () => getPos(viewportPosition, 'y'),
//         setElementPosition: pos => setPos(elementPosition, pos),
//         setViewportPosition: pos => setPos(viewportPosition, pos),
//         renderCount
//     }
// };

const ProfileSelection = (props) => {
    const classes = styles();

    let profils = [1,2,3,4];

    const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
    const elementRef = [];
    profils.map((profil, key) => elementRef.push({[profil]: useRef()}) );

    console.log("elementRef", elementRef);

    const elementRef1 = useRef()
    const elementRef2 = useRef()
    const elementRef3 = useRef()
    const elementRef4 = useRef()
    const elementRef5 = useRef()
    const elementRef6 = useRef()

    useScrollPosition(
        ({ currPos }) => {
            setElementPosition(currPos)
        }, [], elementRef1
    )

    return (
            <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                // ref={viewportRef}
            >
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="row"
                    className={classes.container}
                    spacing={3}
                >
                    <Grid item container xs={3}>

                    </Grid>
                    {/*<Grid item container xs={1}>*/}

                    {/*</Grid>*/}
                    <Grid item container xs={6} className={classes.middleContainer} direction="column">
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
                    {/*<Grid item container xs={1}>*/}

                    {/*</Grid>*/}
                    <Grid item container xs={3}>
                        <Grid item container direction={'column'} className={classes.card}>
                            <Typography variant={'h3'} className={classes.cardTitle}>Faites votre choix</Typography>
                            <Typography variant={'body1'}>Cliquez sur ce bouton *** pour pré-selectionner un ou
                                plusieurs profils. Vous
                                pourrez ensuite valider votre selection ou réaliser un/des entretien.s.</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.divider}/>
                <Grid className={classes.logoAcracyContainer}>
                    <img src={acracy} alt="acracy" className={classes.logoAcracy}/>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignItems="flex-start"
                    direction="row"
                    className={classes.bottomContainer}
                >
                    <Grid item container xs={3} direction={'row'} justify="center"
                          style={{position: "sticky", top: 0, paddingTop: "25vh"}}>
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={{[classes.avatar]: elementPosition.y < 150}}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Recommandation globale"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={{[classes.avatar]: elementPosition.y < 150}}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText secondaryTypographyProps={{color: 'white'}} primary="Anh-Dao"
                                              secondary="Jan 9, 2014"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={{[classes.avatar]: elementPosition.y < 150}}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText secondaryTypographyProps={{color: 'white'}} primary="Work"
                                              secondary="Jan 7, 2014"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={{[classes.avatar]: elementPosition.y < 150}}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText secondaryTypographyProps={{color: 'white'}} primary="Vacation"
                                              secondary="July 20, 2014"/>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item container xs={6}>
                        {profils.map((profil, i) =>
                            <div ref={elementRef1}>
                            <RevealProfil key={i}/>
                            </div>
                        )}

                        <RevealProfil/>
                        <RevealProfil/>
                        <RevealProfil/>
                    </Grid>
                    <Grid item container xs={3}>

                    </Grid>
                </Grid>
            </Grid>

    );
};
export default ProfileSelection;
