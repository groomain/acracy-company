import React, {useEffect, useRef, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {styles} from './style';
import CircleImage from "../../components/CircleImage";
import RevealProfil from "../../components/RevealProfil";
import acracy from "../../assets/icons/logo-acracy-a.svg";
import groupe52copy from "../../assets/icons/group-52-copy.svg";
import groupe52 from "../../assets/icons/group-52.svg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {useScrollPosition} from '@n8tb1t/use-scroll-position'
import {useDispatch, useSelector} from "react-redux";
import {getSelectionProfilLaunched} from "./reducer";
import clsx from "clsx";
import CustomExpansionPanel from "../../components/CustomExpansionPanel";
import Tag from "../../components/Tags/Tag";
import CustomLoader from "../../components/Loader";

const ProfileSelection = (props) => {
    const classes = styles();
    const dispatch = useDispatch();

    let profils = [1, 2, 3, 4];

    const [elementPosition, setElementPosition] = useState({x: 10, y: 450});
    const [elementHeight, setElementHeight] = useState(0);
    const heightRef = useRef();
    const elementsRef = useRef();

    useScrollPosition(
        () => {
            const currPos = heightRef.current.getBoundingClientRect().height;
            setElementHeight(currPos)
        }, [], heightRef
    );

    useScrollPosition(
        ({currPos}) => {
            setElementPosition(currPos)
        }, [], elementsRef
    );

    // const getSelectionProfil = () => {
    //     dispatch(getSelectionProfilLaunched());
    // };

    const {selectionProfilData} = useSelector(state => ({
        selectionProfilData: state.getIn(['SelectionProfil', 'selectionProfilData']),
    }));

    useEffect(() => {
        dispatch(getSelectionProfilLaunched())
    }, []);

    console.log("elementPosition.y", elementPosition.y);

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
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar
                                    className={clsx(classes.borderAvatarAcracy, {[classes.borderAvatarActive]: elementPosition.y > 350})}>
                                    <img src={acracy} alt="acracyLogo" style={{width: 17, height: 17, paddingLeft: 2}}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Recommandation globale"
                                          primaryTypographyProps={{className: {[classes.listItemTextActive]: elementPosition.y > 350}}}/>
                        </ListItem>
                        {profils.map((profil, index) =>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar
                                        className={clsx(classes.avatar, {[classes.avatarActive]: elementPosition.y < 350 - (index * elementHeight / profils.length) && elementPosition.y > 350 - ((index + 1) * elementHeight / profils.length)})}>
                                        <img
                                            src={"https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg"}
                                            alt="linkedingProfil" style={{width: 46, height: 46}}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Anh-Dao"
                                              primaryTypographyProps={{className: {[classes.listItemTextActive]: elementPosition.y < 350 - (index * elementHeight / profils.length) && elementPosition.y > 350 - ((index + 1) * elementHeight / profils.length)}}}/>
                            </ListItem>
                        )}
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar className={classes.borderAvatar}>
                                    {elementPosition.y > 350 ?
                                        <img src={groupe52copy} alt="groupe52copy"
                                            // style={{width: 17, height: 17, paddingLeft: 2}}
                                        /> :
                                        <img src={groupe52} alt="groupe52"
                                            // style={{width: 17, height: 17, paddingLeft: 2}}
                                        />
                                    }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Récapitulatif de mon brief"
                                          primaryTypographyProps={{className: {[classes.listItemTextActive]: elementPosition.y > 350}}}/>
                        </ListItem>
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


                {selectionProfilData ?
                    <Grid item container xs={6} className={classes.middleContainer} direction="column">

                        <Grid item container direction="column" className={classes.firstMiddleContainer}>
                            <Typography className={classes.mainTitle}>Il est temps de faire votre sélection
                                !</Typography>
                            <Typography variant={'h2'}>Le mot d'acracy</Typography>
                            <Typography className={classes.word}>Quae fuerit causa, mox videro; interea hoc epicurus in
                                bonis sit id, de voluptate ponit, quod maxime placeat, facere nondum depravatum ipsa
                                natura
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
                                    <RevealProfil/>
                                )}
                            </div>
                        </div>
                        <Grid container direction={'column'} style={{width: '95%', marginLeft: "5%"}}>
                            <div className={classes.bloc}>
                                <Typography variant={'h2'}>Détails du profil recherché</Typography>
                                <Typography variant={'h1'}>{selectionProfilData.profile.text}</Typography>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Expertises clés du
                                    profil</Typography>
                                <Grid item container direction={"row"} spacing={1}>
                                    {selectionProfilData.missionRequirement.expertises.map((tag, key) => <Grid item><Tag
                                        key={key} title={tag.expertise.text} isPrimaryColor
                                        tagType="Prioritaire" isWithCheckbox checked={tag.priority}/></Grid>)}
                                </Grid>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Langue souhaitée</Typography>
                                <Grid style={{width: '80%'}} item container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <Tag title={selectionProfilData.missionRequirement.language.language}
                                             isPrimaryColor
                                             tagType="Critère indispensable"
                                             isWithCheckbox
                                             checked={selectionProfilData.missionRequirement.language.essential}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Sensibilité souhaitée</Typography>
                                <Grid style={{width: '80%'}} item container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <Tag title={selectionProfilData.missionRequirement.sensitivity.sensitivity.text}
                                             isPrimaryColor
                                             tagType="Critère indispensable"
                                             isWithCheckbox
                                             checked={selectionProfilData.missionRequirement.sensitivity.essential}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Séniorite souhaitée</Typography>
                                <Typography variant={'h4'}
                                            style={{
                                                width: '100%',
                                                padding: 30,
                                                backgroundColor: "#283028",
                                                borderRadius: 15
                                            }}>{selectionProfilData.missionRequirement.seniority}</Typography>
                            </div>
                        </Grid>
                        <Grid>
                            <Grid container direction={'column'}
                                  style={{width: '95%', marginLeft: "5%", marginTop: 150}}>
                                <div className={classes.title}>
                                    <Typography variant={'h1'}>Ma Mission</Typography>
                                </div>
                                <div className={classes.bloc}>
                                    <Typography variant={'h2'}>Titre de la mission</Typography>
                                    <Typography variant={'h1'}>{selectionProfilData.missionContext.title}</Typography>
                                </div>
                            </Grid>
                            <Grid container direction={'row'} className={classes.card}>
                                <Grid container item xs={5} direction={'column'} spacing={2}>
                                    <Grid item className={classes.blocTypoUp}>
                                        <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                                        <Typography variant={"body1"}
                                                    className={classes.typo}>{selectionProfilData.missionContext.format}</Typography>
                                    </Grid>
                                    <Grid item className={classes.blocTypoDown}>
                                        <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                                        <Typography variant={"body1"}
                                                    className={classes.typo}>{selectionProfilData.missionContext.weeklyRythm}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={5} direction={'column'} spacing={2}>
                                    <Grid item className={classes.blocTypoUp}>
                                        <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                                        <Typography variant={"body1"}
                                                    className={classes.typo}>{selectionProfilData.missionContext.duration.nb}
                                            {selectionProfilData.missionContext.duration.nb} à partir
                                            du {selectionProfilData.missionContext.startDate}</Typography>
                                    </Grid>
                                    <Grid item className={classes.blocTypoDown}>
                                        <Typography variant={"h4"} className={classes.typo}>Adresse</Typography>
                                        <Typography variant={"body1"}
                                                    className={classes.typo}>{selectionProfilData.missionContext.address}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={2} direction={'column'} spacing={2}>
                                    <Grid item container className={classes.blocTypoUp}>
                                        <Typography variant={"h4"} className={classes.typo}>TJM</Typography>
                                        <Typography variant={"body1"}
                                                    className={classes.typo}>{selectionProfilData.missionContext.estimatedAverageDailyRate} €/j</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div className={classes.bloc}>
                                <Typography variant={'h2'}>Livrable.s</Typography>
                                <Grid container direction={'row'} style={{width: '80%', marginTop: 5}} spacing={1}>
                                    {selectionProfilData.deliverables.map((tag, key) =>
                                        <Grid item>
                                            <Tag key={key} title={tag.text} isPrimaryColor={false}/>
                                        </Grid>)}
                                </Grid>
                            </div>
                            <div className={classes.bloc}>

                                <CustomExpansionPanel isTag={false}
                                                      panelTitle="Contexte de la mission et tâches à réaliser">
                                    <Typography>
                                        {selectionProfilData.missionDetail.contextAndTasks}
                                    </Typography>
                                </CustomExpansionPanel>
                            </div>
                            <div className={classes.bloc}>

                                <CustomExpansionPanel isTag={false} panelTitle="Détails des livrables">
                                    <Typography>
                                        {selectionProfilData.missionDetail.DetailsOfDeliverables}
                                    </Typography>
                                </CustomExpansionPanel>
                            </div>
                        </Grid>

                    </Grid>
                    :
                    <CustomLoader/>}


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
