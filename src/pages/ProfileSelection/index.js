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
import {getSelectionProfilLaunched, validateProfilesLaunched} from "./reducer";
import clsx from "clsx";
import CustomExpansionPanel from "../../components/CustomExpansionPanel";
import Tag from "../../components/Tags/Tag";
import CustomLoader from "../../components/Loader";
import {Link, Element, animateScroll as scroll} from 'react-scroll'
import * as Scroll from 'react-scroll';
import checkStatus from "../../assets/icons/small-check.svg";
import infosSmall from "../../assets/icons/infos-small-copy.svg";
import CustomButton from "../../components/Button";
import CustomModal from "../../components/Modal";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomTextArea from "../../components/Inputs/CustomTextArea";
import Dialog from '@material-ui/core/Dialog';
import {loginLaunched} from "../../components/App/reducer";

const ProfileSelection = (props) => {
    const dispatch = useDispatch();

    const {selectionProfilData, validateError} = useSelector(state => ({
        selectionProfilData: state.getIn(['SelectionProfil', 'selectionProfilData']),
        validateCodeError: state.getIn(['SelectionProfil', 'validateCodeError']),
    }));

    let profils = [1, 2, 3, 4];
    let [noProfilMotif, setNoProfilMotif] = React.useState(null);
    let [checkedProfiles, setCheckedProfiles] = React.useState([]);
    const [elementPosition, setElementPosition] = useState({x: 10, y: 450});
    const [elementHeight, setElementHeight] = useState(0);
    const [noProfileModaleOpen, setNoProfileModaleOpen] = useState(false);
    const [validateChoiceModaleOpen, setValidateChoiceModaleOpen] = useState(false);
    const [informationCompleteOpen, setInformationCompleteOpen] = useState(false);
    // const [validateChoiceModaleOpen, setValidateChoiceModaleOpen] = useState(validateError);
    const heightRef = useRef();
    const elementsRef = useRef();
    const classes = styles();
    let Element = Scroll.Element;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const validateProfiles = (profiles) => {
        dispatch(validateProfilesLaunched(profiles));
    };

    const handleNoProfileModaleOpen = () => {
        setNoProfileModaleOpen(!noProfileModaleOpen);
    };

    const handleInformationCompleteOpen = () => {
        setInformationCompleteOpen(!informationCompleteOpen);
    };

    const handleValidateChoiceModaleOpen = () => {
        setValidateChoiceModaleOpen(!validateChoiceModaleOpen);
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleCheckedProfiles = (index) => {
        if (!checkedProfiles.includes(index)) {
            console.log("ABSENT");
            setCheckedProfiles([index, ...checkedProfiles])
        } else if (checkedProfiles.includes(index)) {
            console.log("PRESENT");
            const indexToDelete = checkedProfiles.indexOf(index);
            const newCheckedProfiles = [...checkedProfiles.slice(0, indexToDelete), ...checkedProfiles.slice(indexToDelete + 1)];
            setCheckedProfiles(newCheckedProfiles)
        }
    };

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

    useEffect(() => {
        dispatch(getSelectionProfilLaunched())
    }, []);

    const heightProfilesContainer = elementHeight / profils.length;
    const margin = 350;

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
                {selectionProfilData &&
                <Grid item container xs={3} direction={'row'} justify="center" alignItems="flex-start">
                    <List className={classes.list}>
                        <ListItem className={classes.listItem} onClick={() => scroll.scrollToTop()}>
                            <ListItemAvatar>
                                <Avatar
                                    className={clsx(classes.borderAvatarAcracy, {[classes.borderAvatarActive]: elementPosition.y > margin})}>
                                    <img src={acracy} alt="acracyLogo" style={{width: 17, height: 17, paddingLeft: 2}}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Recommandation globale"
                                          primaryTypographyProps={{
                                              className: {
                                                  [classes.listItemText]: elementPosition.y < margin,
                                                  [classes.listItemTextActive]: elementPosition.y > margin
                                              }
                                          }}/>
                        </ListItem>
                        {profils.map((profil, index) => {
                            const isActive = elementPosition.y < margin - (index * heightProfilesContainer) && elementPosition.y > margin - ((index + 1) * heightProfilesContainer);
                            return (<Link to={index} smooth={true}>
                                <ListItem className={classes.listItem}>
                                    <ListItemAvatar>
                                        {
                                            checkedProfiles.includes(index) &&
                                            <img src={checkStatus} alt="checked" className={classes.avatarCheck}/>
                                        }
                                        <Avatar
                                            className={clsx(classes.avatar, {[classes.avatarActive]: isActive})}
                                            src={"https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg"}/>
                                    </ListItemAvatar>
                                    <ListItemText primary="Anh-Dao"
                                                  primaryTypographyProps={{
                                                      className: {
                                                          [classes.listItemText]: !isActive,
                                                          [classes.listItemTextActive]: isActive
                                                      }
                                                  }}/>
                                </ListItem>
                            </Link>)
                        })}
                        <Link to="lastContainer" smooth={true}>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar className={classes.borderAvatar}>
                                        {elementPosition.y < margin - elementHeight ?
                                            <img src={groupe52copy} alt="groupe52copy"/>
                                            :
                                            <img src={groupe52} alt="groupe52"/>
                                        }
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Récapitulatif de mon brief"
                                              primaryTypographyProps={{
                                                  className: {
                                                      [classes.listItemText]: elementPosition.y > margin - elementHeight,
                                                      [classes.listItemTextActive]: elementPosition.y < margin - elementHeight
                                                  }
                                              }}/>
                            </ListItem>
                        </Link>
                    </List>
                </Grid>}


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
                                    <Element name={i}>
                                        <Grid item container direction={'column'}
                                              style={{position: 'absolute', marginTop: 70, width: 215, left: '80%'}}>
                                            <Grid item container justify={'center'} alignItems={'center'} style={{
                                                backgroundColor: '#212a21',
                                                width: 215,
                                                height: 141,
                                                borderRadius: '15px 15px 0 0',
                                                marginBottom: 2,
                                                padding: 20
                                            }} spacing={0}>
                                                <img src={infosSmall} alt={'infoSmall'}
                                                     style={{position: 'absolute', top: 10, right: 10}}
                                                     aria-owns={open ? 'mouse-over-popover' : undefined}
                                                     aria-haspopup="true" onMouseEnter={handlePopoverOpen}
                                                     onMouseLeave={handlePopoverClose}/>
                                                {open &&
                                                <Grid item container direction={'column'}
                                                      className={classes.paper}>
                                                    <Typography className={classes.popoverTypoTitle}>Pourquoi ce TJM
                                                        étrange ?</Typography>
                                                    <Typography className={classes.popoverTypo}>
                                                        Nous incluons dans le TJM des freelances les frais de X%
                                                        liés à l’affacturage.
                                                        C’est un système qui leur permet d’être protégés avec un
                                                        paiement rapide, et qui nous permet de fidéliser les
                                                        meilleurs freelances.</Typography>
                                                </Grid>
                                                }
                                                <Typography style={{
                                                    fontSize: 34,
                                                    fontFamily: 'Basier Regular', color: '#ecf805'
                                                }}>550€/j</Typography>
                                                <Grid item container direction={'row'} justify={'center'}
                                                      alignItems={'center'}>
                                                    <Typography style={{
                                                        fontSize: 14,
                                                        fontFamily: 'Basier Regular',
                                                        color: '#ecf805'
                                                    }}>Soit </Typography>
                                                    <div style={{
                                                        color: 'black',
                                                        backgroundColor: 'yellow',
                                                        borderRadius: '15px',
                                                        width: 70,
                                                        marginLeft: 5,
                                                        marginRight: 5
                                                    }}><Typography style={{
                                                        fontFamily: 'Basier Regular',
                                                        color: '#162217',
                                                        fontSize: 14,
                                                        textAlign: 'center'
                                                    }}>632,50€</Typography></div>
                                                </Grid>
                                                <Typography style={{
                                                    fontSize: 14,
                                                    fontFamily: 'Basier Regular',
                                                    color: '#ecf805'
                                                }}>Commission incluse</Typography>
                                            </Grid>
                                            <Grid item container justify="center" alignItems="center" style={{
                                                backgroundColor: '#1b251c',
                                                width: 215,
                                                height: 123,
                                                borderRadius: '0 0 15px 15px'
                                            }}>
                                                <Typography variant={'body2'} style={{width: 165, textAlign: 'center'}}>En
                                                    pré-selectionnant ce profil, vous acceptez <span
                                                        style={{color: 'yellow'}}>les CGV</span> du profil</Typography>
                                            </Grid>
                                        </Grid>
                                        <RevealProfil style={{paddingTop: 70, paddingBottom: 70}} index={i}
                                                      setCheckedProfiles={handleCheckedProfiles}/>
                                    </Element>
                                )}

                            </div>
                        </div>
                        <Grid container direction={'column'} style={{width: '70%', marginLeft: "5%"}}>
                            <Element name="lastContainer">
                                <div className={classes.bloc}>
                                    <Typography variant={'h2'}>Détails du profil recherché</Typography>
                                    <Typography variant={'h1'}>{selectionProfilData.profile.text}</Typography>
                                </div>
                            </Element>
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
                            <div className={classes.secondTitle}>
                                <Typography variant={'h1'}>Ma Mission</Typography>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h2'}>Titre de la mission</Typography>
                                <Typography variant={'h1'}>{selectionProfilData.missionContext.title}</Typography>
                            </div>

                        </Grid>
                        <Grid container direction={'row'} className={classes.footerCard}>
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
                        <Grid container direction={'column'} style={{width: '70%', marginLeft: "5%"}}>

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
                    <Grid item container xs={12} className={classes.loader} direction="column" justify="center"
                          alignItems="center">
                        <CustomLoader/>
                    </Grid>
                }

                {selectionProfilData &&
                <Grid item container xs={3}>
                    <Grid item container direction={'column'} className={classes.card}>
                        <Typography variant={'h3'} className={classes.cardTitle}>Faites votre choix</Typography>
                        <Typography variant={'body1'}>Cliquez sur ce bouton *** pour pré-selectionner un ou
                            plusieurs profils. Vous
                            pourrez ensuite valider votre selection ou réaliser un/des entretien.s.</Typography>
                    </Grid>
                </Grid>
                }
            </Grid>
            {/*<Grid className={classes.logoAcracyContainer}>*/}
            {/*<img src={acracy} alt="acracy" className={classes.logoAcracy}/>*/}
            {/*</Grid>*/}
            {selectionProfilData &&
            <Grid item container className={classes.cart} direction={'row'} xs={12}>
                <Grid container item xs={9} direction={'row'}>
                    <Typography
                        style={{
                            fontSize: 17,
                            fontFamily: 'Basier Medium',
                            width: 200,
                            padding: 25,
                            textAlign: 'left',
                            color: 'black',
                            marginTop: 'auto',
                            marginBottom: 'auto'
                        }}>{checkedProfiles.length === 0 ?
                        'Aucuns Profils pre-sélectionnés'
                        :
                        'Ma pre-sélection'
                    }</Typography>
                    {checkedProfiles.map((profile, index) =>
                        <ListItem style={{width: 250}}>
                                <ListItemAvatar>
                                    <Avatar
                                        className={classes.avatar}>
                                        <img
                                            src={"https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg"}
                                            alt="linkedingProfil" style={{width: 46, height: 46}}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={"Anh Dao"}
                                              primaryTypographyProps={{className: classes.cartText}}
                                              secondary={'Social Media Strategist'}
                                              secondaryTypographyProps={{className: classes.cartTextSecondary}}
                                />
                            </ListItem>
                    )}
                </Grid>
                {checkedProfiles.length === 0 ?
                    <Grid item container direction={'row'} xs={3}>
                        <CustomButton title={"Aucun profil ne convient"} theme={'outlinedBlackBorder'}
                                      style={{width: 221, marginRight: 20}}
                                      handleClick={() => handleNoProfileModaleOpen()}/>
                        <CustomButton title={"Contacter acracy"} theme={'outlinedBlackBorder'}
                                      style={{width: 172, marginRight: 20}}/>
                    </Grid>
                    :
                    <Grid item container direction={'row'} xs={3}>
                        <CustomButton title={"Faire passer des entretiens"} theme={'outlinedBlackBorder'}
                                      style={{width: 219, marginRight: 20}}

                        />
                        <CustomButton title={"Valider choix profil.s"} theme={'outlinedBlackBackground'}
                                      style={{width: 219, marginRight: 15}}
                                      handleClick={() => handleValidateChoiceModaleOpen()}
                        />
                    </Grid>
                }

            </Grid>
            }
            <Dialog open={informationCompleteOpen} onClose={handleInformationCompleteOpen} classes={{ paper: classes.modale}}>
                <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
                    <Typography variant={"h1"}>Validez vos informations entreprise</Typography>
                    <Typography variant={"body1"} style={{marginBottom: 20}}>Sed ut labore et molestiae consequatur, vel eum fugiat, quo pertineant non fuisse torquem detraxit hosti  :</Typography>
                    <Typography variant={"body1"}>- Siret</Typography>
                    <Typography variant={"body1"} style={{marginBottom: 20}}>- Statut</Typography>
                    <CustomButton theme={"filledButton"} style={{width: 254}} title={"Compléter mes informations"} handleClick={() => console.log("test confirme réponse")} />
                </Grid>
            </Dialog>
            <Dialog open={noProfileModaleOpen} onClose={handleNoProfileModaleOpen} classes={{ paper: classes.modale}}>
                <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
                    <Typography variant={"h1"}>Aucun profil ne me convient</Typography>
                    <Typography variant={"body1"} style={{marginBottom: 20}}>Afin de pouvoir améliorer nos futures propositions, n’hésitez pas à
                        nous dire la raison du refus de ces profils.</Typography>
                    <CustomSelect placeholder={"Sélectionner raison"} label={"Raison"} optionsValues={['test1', "test2"]}/>
                    <CustomTextArea style={{height: 241}} placeholder={"Donnez nous plus de détails"}  noProfilMotif setNoProfilMotif/>
                    <CustomButton theme={"filledButton"} style={{width: 254}} title={"Confirmer et envoyer réponse"} handleClick={() => console.log("noProfilMotif", noProfilMotif)} />
                </Grid>
            </Dialog>
            <Dialog open={validateChoiceModaleOpen} onClose={handleValidateChoiceModaleOpen} classes={{ paper: classes.modale}}>
                <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
                    <Typography variant={"h1"}>Confirmation sélection</Typography>
                    <Typography variant={"body1"} >Vous êtes sur le point de confirmer la sélection de deux profils.</Typography>
                    <Typography variant={"body1"} style={{marginBottom: 20}}>En confirmant, vous recevrez un email sur <span style={{color: "#ecf805"}}>prénomnom@entreprise.com</span> vous invitant à signer le devis.</Typography>
                    <Typography variant={"body1"}>Dès la signature de ce dernier, vous pourrez accéder aux profils.</Typography>
                    <Grid item container direction={"row"}>
                        <Grid item container direction={"column"} xs={7} justify={'flex-end'}>
                        <Typography variant={"body1"} style={{width: 200,  fontSize: 14,
                            fontFamily: 'Basier Medium', marginBottom: 20}}>Vous n’avez pas reçu le devis?</Typography>
                        </Grid>
                        <Grid item container direction={"column"} xs={5}>

                        <CustomButton style={{width: 183}} theme={"filledButton"} title={"Confimer ma sélection"} handleClick={() => validateProfiles()} />
                    <CustomButton style={{width: 183}} theme={"filledButton"} title={"Renvoyer email"} handleClick={() => console.log("test confirme réponse3")} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
            {/*<Dialog open={noProfileModaleOpen} onClose={handleNoProfileModaleOpen} classes={{ paper: classes.modale }}>*/}
                {/*<Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>*/}
                    {/*<Typography variant={"h1"}>Aucun profil ne me convient</Typography>*/}
                    {/*<Typography variant={"body1"} style={{marginBottom: 20}}>Afin de pouvoir améliorer nos futures propositions, n’hésitez pas à*/}
                        {/*nous dire la raison du refus de ces profils.</Typography>*/}
                    {/*<CustomSelect placeholder={"Sélectionner raison"} label={"Raison"} optionsValues={['test1', "test2"]}/>*/}
                    {/*<CustomTextArea style={{height: 241}} placeholder={"Donnez nous plus de détails"} />*/}
                    {/*<CustomButton theme={"filledButton"} style={{width: 254}} title={"Confirmer et envoyer réponse"} handleClick={() => console.log("test confirme réponse")} />*/}
                {/*</Grid>*/}
            {/*</Dialog>*/}
        </Grid>

    );
};
export default ProfileSelection;
