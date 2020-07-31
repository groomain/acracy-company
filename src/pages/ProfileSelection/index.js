import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { styles } from './style';
import CircleImage from "../../components/CircleImage";
import RevealProfil from "../../components/RevealProfil";
import acracy from "../../assets/icons/logo-acracy-a.svg";
import groupe52copy from "../../assets/icons/group-52-copy.svg";
import groupe52 from "../../assets/icons/group-52.svg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useDispatch, useSelector } from "react-redux";
import { contactAcracyLaunched, getBriefLaunched, setCheckedProfileStore, validateProfilesLaunched } from "./reducer";
import { handleCurrentStep } from '../../components/App/reducer';
import clsx from "clsx";
import CustomExpansionPanel from "../../components/CustomExpansionPanel";
import Tag from "../../components/Tags/Tag";
import CustomLoader from "../../components/Loader";
import { Link, Element, animateScroll as scroll } from 'react-scroll'
import * as Scroll from 'react-scroll';
import checkStatus from "../../assets/icons/small-check.svg";
import infosSmall from "../../assets/icons/infos-small-copy.svg";
import miniSwitch from "../../assets/icons/mini-switch.svg";
import CustomButton from "../../components/Button";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomTextArea from "../../components/Inputs/CustomTextArea";
import Dialog from '@material-ui/core/Dialog';
import Popover from "@material-ui/core/Popover";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const ProfileSelection = (props) => {
  const quoteId = props?.match?.params;

  // console.log(quoteId);

  const classes = styles();
  const dispatch = useDispatch();
  const { briefData, quotesData, validateCodeError, validateLoading, userDynamo, checkedProfilesStore, contactLoading } = useSelector(state => ({
    briefData: state.getIn(['SelectionProfil', 'briefData']),
    quotesData: state.getIn(['SelectionProfil', 'quotesData']),
    validateCodeError: state.getIn(['SelectionProfil', 'validateCodeError']),
    validateLoading: state.getIn(['SelectionProfil', 'validateLoading']),
    userDynamo: state.getIn(['app', 'userDynamo']),
    checkedProfilesStore: state.getIn(['SelectionProfil', 'checkedProfilesStore']),
    contactLoading: state.getIn(['SelectionProfil', 'contactLoading'])
  }));

  // Scroll
  let [checkedProfiles, setCheckedProfiles] = React.useState(checkedProfilesStore);
  const [elementPosition, setElementPosition] = useState({ x: 10, y: 450 });
  const [elementHeight, setElementHeight] = useState(0);
  const heightRef = useRef();
  const elementsRef = useRef();
  let Element = Scroll.Element;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Popover pour les profils du panier
  const [anchorElPopover, setAnchorElPopover] = React.useState(null);
  const openPopover = Boolean(anchorElPopover);

  // Modale - aucun profil sélectionné
  const [noProfileModaleOpen, setNoProfileModaleOpen] = useState(false);
  let [noProfilMotif, setNoProfilMotif] = React.useState('');
  let [noProfilSelect, setNoProfilSelect] = React.useState('');

  // Modale - validation de choix
  const [validateChoiceModaleOpen, setValidateChoiceModaleOpen] = useState(false);

  // Modale - Contacter Acracy
  const [contactOpen, setContactModaleOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSelect, setContactSelect] = useState('');

  // Modale - Entretien
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [interviewMessage, setInterviewMessage] = useState('');

  const [informationCompleteOpen, setInformationCompleteOpen] = useState(false);

  const validateProfiles = () => {
    let validateProfiles = [];
    for (let i = 0; i < checkedProfiles.length; i++) {
      validateProfiles.push(quotesData[checkedProfiles[i]].externalId)
    }
    dispatch(validateProfilesLaunched({ type: 'ACCEPT_QUOTES', listId: validateProfiles, quoteId: briefData.externalId }));
  };

  const refuseAllProfiles = () => {
    dispatch(validateProfilesLaunched({ type: 'REFUSE_ALL_QUOTES', text: noProfilMotif, reason: noProfilSelect, quoteId: briefData.externalId }));
    handleNoProfileModaleOpen()
  };

  const contactAcracy = (message, reason, interview, setOpen) => {
    dispatch(contactAcracyLaunched({ message: message, reason: reason, interview: interview }));
    setOpen()
  };

  const handleContactOpen = () => {
    setContactModaleOpen(!open);
  };

  const handleInterviewOpen = () => {
    setInterviewOpen(!interviewOpen);
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
      setCheckedProfiles([index, ...checkedProfiles]);
      dispatch(setCheckedProfileStore([index, ...checkedProfiles]));
    } else if (checkedProfiles.includes(index)) {
      const indexToDelete = checkedProfiles.indexOf(index);
      const newCheckedProfiles = [...checkedProfiles.slice(0, indexToDelete), ...checkedProfiles.slice(indexToDelete + 1)];
      setCheckedProfiles(newCheckedProfiles);
      dispatch(setCheckedProfileStore(newCheckedProfiles));
    }
  };

  useScrollPosition(
    () => {
      const currPos = heightRef.current.getBoundingClientRect().height;
      setElementHeight(currPos)
    }, [], heightRef
  );

  useScrollPosition(
    ({ currPos }) => {
      setElementPosition(currPos)
    }, [], elementsRef
  );

  useEffect(() => {
    dispatch(getBriefLaunched({ companyId: userDynamo.companyId, briefId: quoteId }))
    dispatch(handleCurrentStep(0));
  }, [dispatch]);

  const heightProfilesContainer = quotesData && elementHeight / quotesData.length;
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
        {briefData &&
          <Grid item container xs={3} direction={'row'} justify="center" alignItems="flex-start">
            <List className={classes.list}>
              <ListItem className={classes.listItem} onClick={() => scroll.scrollToTop()}>
                <ListItemAvatar>
                  <Avatar
                    className={clsx(classes.borderAvatarAcracy, { [classes.borderAvatarActive]: elementPosition.y > margin })}>
                    <img src={acracy} alt="acracyLogo" className={classes.logoAcracy} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Recommandation globale"
                  primaryTypographyProps={{
                    className: {
                      [classes.listItemText]: elementPosition.y < margin,
                      [classes.listItemTextActive]: elementPosition.y > margin
                    }
                  }} />
              </ListItem>
              {quotesData.map((profile, index) => {
                const isActive = elementPosition.y < margin - (index * heightProfilesContainer) && elementPosition.y > margin - ((index + 1) * heightProfilesContainer);
                return (<Link to={index} smooth={true}>
                  <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                      {
                        checkedProfiles.includes(index) &&
                        <img src={checkStatus} alt="checked" className={classes.avatarCheck} />
                      }
                      <Avatar
                        className={clsx(classes.avatar, { [classes.avatarActive]: isActive })}
                        src={profile?.serviceProviderProfile?.linkedinAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={`${profile?.serviceProviderProfile?.firstName} ${profile?.serviceProviderProfile?.lastName}`}
                      primaryTypographyProps={{
                        className: {
                          [classes.listItemText]: !isActive,
                          [classes.listItemTextActive]: isActive
                        }
                      }} />
                  </ListItem>
                </Link>)
              })}
              <Link to="lastContainer" smooth={true}>
                <ListItem className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar className={classes.borderAvatar}>
                      {elementPosition.y < margin - elementHeight ?
                        <img src={groupe52copy} alt="groupe52copy" />
                        :
                        <img src={groupe52} alt="groupe52" />
                      }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Récapitulatif de mon brief"
                    primaryTypographyProps={{
                      className: {
                        [classes.listItemText]: elementPosition.y > margin - elementHeight,
                        [classes.listItemTextActive]: elementPosition.y < margin - elementHeight
                      }
                    }} />
                </ListItem>
              </Link>
            </List>
          </Grid>}


        {briefData ?
          <Grid item container xs={6} className={classes.middleContainer} direction="column">
            <Grid item container direction="column" className={classes.firstMiddleContainer}>
              <Typography className={classes.mainTitle}>Il est temps de faire votre sélection
                                !</Typography>
              <Typography variant={'h2'}>Le mot d'acracy</Typography>
              <Typography className={classes.word}>{briefData.acracyRecommandation}</Typography>
              <Grid container direction={'row'} alignItems={'center'} className={classes.authorContainer}>
                <CircleImage />
                <Typography variant="body2" className={classes.authorTypo}>Séverine, Chief
                                    TalentOfficier</Typography>
              </Grid>
            </Grid>
            <div ref={elementsRef}>
              <div ref={heightRef}>
                {quotesData.map((profile, i) =>
                  <Element name={i}>
                    <Grid item container direction={'column'}
                      className={classes.firstGridElement}>
                      <Grid item container justify={'center'} alignItems={'center'} className={classes.tjmContainer} spacing={0}>
                        <img src={infosSmall} alt={'infoSmall'}
                          className={classes.infoTjm}
                          aria-owns={open ? 'mouse-over-popover' : undefined}
                          aria-haspopup="true" onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose} />
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
                        <Typography className={classes.tjm}>{profile?.averageDeliverated} €/j</Typography>
                        <Grid item container direction={'row'} justify={'center'}
                          alignItems={'center'}>
                          <Typography className={classes.tjmText}>Soit </Typography>
                          <div className={classes.tjmWithTaxContainer}>
                            <Typography className={classes.tjmWithTax}>632,50€</Typography>
                          </div>
                        </Grid>
                        <Typography className={classes.tjmText}>Commission incluse</Typography>
                      </Grid>
                      <Grid item container justify="center" alignItems="center" className={classes.tjmSecondContainer}>
                        <Typography variant={'body2'} className={classes.tjmSecondtext}>En
                                                    pré-selectionnant ce profil, vous acceptez <span
                            style={{ color: 'yellow' }}>les CGV</span> du profil</Typography>
                      </Grid>
                    </Grid>
                    <RevealProfil profil={profile?.serviceProviderProfile} className={classes.revealProfil} index={i}
                      setCheckedProfiles={handleCheckedProfiles} />
                  </Element>
                )}

              </div>
            </div>
            <Grid container direction={'column'} className={classes.briefContainer}>
              <Element name="lastContainer">
                <div className={classes.bloc}>
                  <Typography variant={'h2'}>Détails du profil recherché</Typography>
                  <Typography variant={'h1'}>{briefData?.profile?.text || null}</Typography>
                </div>
              </Element>
              <div className={classes.bloc}>
                <Typography variant={'h4'} className={classes.title}>Expertises clés du
                                    profil</Typography>
                <Grid item container direction={"row"} spacing={1}>
                  {briefData.missionRequirements.expertises.map((tag, key) => <Grid item><Tag
                    key={key} title={tag.expertise.text} isPrimaryColor
                    tagType="Prioritaire" isWithCheckbox checked={tag.priority} /></Grid>)}
                </Grid>
              </div>
              <div className={classes.bloc}>
                <Typography variant={'h4'} className={classes.title}>Langue souhaitée</Typography>
                <Grid style={{ width: '80%' }} item container direction={"row"} spacing={1}>
                  <Grid item>
                    <Tag title={briefData.missionRequirements.languages.language}
                      isPrimaryColor
                      tagType="Critère indispensable"
                      isWithCheckbox
                      checked={briefData.missionRequirements.languages.essential}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.bloc}>
                <Typography variant={'h4'} className={classes.title}>Sensibilité souhaitée</Typography>
                <Grid style={{ width: '80%' }} item container direction={"row"} spacing={1}>
                  <Grid item>
                    <Tag title={briefData.missionRequirements.sensitivity.sensitivity.text}
                      isPrimaryColor
                      tagType="Critère indispensable"
                      isWithCheckbox
                      checked={briefData.missionRequirements.sensitivity.essential}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.bloc}>
                <Typography variant={'h4'} className={classes.title}>Séniorite souhaitée</Typography>
                <Typography variant={'h4'}
                  className={classes.briefSeniority}>{briefData.missionRequirements.seniority}</Typography>
              </div>
              <div className={classes.secondTitle}>
                <Typography variant={'h1'}>Ma Mission</Typography>
              </div>
              <div className={classes.bloc}>
                <Typography variant={'h2'}>Titre de la mission</Typography>
                <Typography variant={'h1'}>{briefData.missionContext.title}</Typography>
              </div>

            </Grid>
            <Grid container direction={'row'} className={classes.footerCard}>
              <Grid container item xs={5} direction={'column'} spacing={2}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                  <Typography variant={"body1"}
                    className={classes.typo}>{briefData.missionContext.format}</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                  <Typography variant={"body1"}
                    className={classes.typo}>{briefData.missionContext.weeklyRythm}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={5} direction={'column'} spacing={2}>
                <Grid item className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                  <Typography variant={"body1"}
                    className={classes.typo}>{briefData.missionContext.duration.nb}
                    {briefData.missionContext.duration.nb} à partir
                                        du {briefData.missionContext.startDate}</Typography>
                </Grid>
                <Grid item className={classes.blocTypoDown}>
                  <Typography variant={"h4"} className={classes.typo}>Adresse</Typography>
                  <Typography variant={"body1"}
                    className={classes.typo}>{briefData.missionContext.address}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={2} direction={'column'} spacing={2}>
                <Grid item container className={classes.blocTypoUp}>
                  <Typography variant={"h4"} className={classes.typo}>TJM</Typography>
                  <Typography variant={"body1"}
                    className={classes.typo}>{briefData.missionContext.estimatedAverageDailyRate} €/j</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction={'column'} className={classes.briefContainer}>
              <div className={classes.bloc}>
                <Typography variant={'h2'}>Livrable.s</Typography>
                <Grid container direction={'row'} className={classes.tagContainer} spacing={1}>
                  {briefData?.deliverables?.map((tag, key) =>
                    <Grid item>
                      <Tag key={key} title={tag.text} isPrimaryColor={false} />
                    </Grid>)}
                </Grid>
              </div>
              <div className={classes.bloc}>

                <CustomExpansionPanel isTag={false}
                  panelTitle="Contexte de la mission et tâches à réaliser">
                  <Typography>
                    {briefData.missionDetail.contextAndTasks}
                  </Typography>
                </CustomExpansionPanel>
              </div>
              <div className={classes.bloc}>

                <CustomExpansionPanel isTag={false} panelTitle="Détails des livrables">
                  <Typography>
                    {briefData.missionDetail.DetailsOfDeliverables}
                  </Typography>
                </CustomExpansionPanel>
              </div>
            </Grid>
          </Grid>
          :
          <Grid item container xs={12} className={classes.loader} direction="column" justify="center"
            alignItems="center">
            <CustomLoader />
          </Grid>
        }

        {briefData &&
          <Grid item container xs={3}>
            <Grid item container direction={'column'} className={classes.card}>
              <Typography variant={'h3'} className={classes.cardTitle}>Faites votre choix</Typography>
              <Typography variant={'body1'}>Cliquez sur ce bouton <img src={miniSwitch} alt="mini-switch" className={classes.miniSwitch} /> pour pré-selectionner un ou
                            plusieurs profils. Vous
                            pourrez ensuite valider votre selection ou réaliser un/des entretien.s.</Typography>
            </Grid>
          </Grid>
        }
      </Grid>
      {briefData &&
        <Grid item container className={classes.cart} direction={'row'} xs={12}>
          <Grid container item xs={9} direction={'row'}>
            <Typography
              className={classes.cartTitle}>{checkedProfiles.length === 0 ?
                'Aucuns Profils pre-sélectionnés'
                :
                'Ma pre-sélection'
              }</Typography>
            {checkedProfiles.map((profileIndex, index) =>
              <ListItem className={classes.cartList}>
                <ListItemAvatar>
                  <Avatar
                    onMouseEnter={(event) => { setAnchorElPopover(event.currentTarget); }}
                    onMouseLeave={() => { setAnchorElPopover(null); }}
                    className={classes.avatar}>
                    <img
                      src={quotesData[profileIndex].serviceProviderProfile.linkedinAvatar}
                      alt={quotesData[profileIndex].serviceProviderProfile.firstName}
                      className={classes.cartAvatar}
                    />
                  </Avatar>
                  <Popover
                    id="mouse-over-popover"
                    open={openPopover}
                    anchorEl={anchorElPopover}
                    onClose={() => setAnchorElPopover(null)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    className={classes.popover}
                    classes={{
                      paper: classes.paperPopover,
                    }}
                    disableRestoreFocus
                  >
                    {quotesData[profileIndex].serviceProviderProfile.firstName} {quotesData[profileIndex].serviceProviderProfile.lastName}
                  </Popover>
                </ListItemAvatar>
              </ListItem>
            )}
          </Grid>
          {checkedProfiles.length === 0 ?
            <Grid item container direction={'row'} xs={3}>
              <CustomButton title={"Aucun profil ne convient"} theme={'outlinedBlackBorder'}
                className={classes.cartButton1}
                handleClick={() => handleNoProfileModaleOpen()}
                loading={validateLoading} />
              <CustomButton title={"Contacter acracy"} theme={'outlinedBlackBorder'}
                className={classes.cartButton2}
                handleClick={() => handleContactOpen()}
                loading={contactLoading} />

            </Grid>
            :
            <Grid item container direction={'row'} xs={3}>
              <CustomButton title={"Faire passer des entretiens"} theme={'outlinedBlackBorder'}
                className={classes.cartButton3}
                handleClick={() => handleInterviewOpen()}
                loading={contactLoading}
              />
              <CustomButton title={"Valider choix profil.s"} theme={'outlinedBlackBackground'}
                className={classes.cartButton4}
                handleClick={() => handleValidateChoiceModaleOpen()}
                loading={validateLoading}
              />
            </Grid>
          }

        </Grid>
      }
      <Dialog open={validateCodeError === 409} onClose={handleInformationCompleteOpen} classes={{ paper: classes.modale }}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <Typography variant={"h1"}>Validez vos informations entreprise</Typography>
          <Typography variant={"body1"} style={{ marginBottom: 20 }}>Sed ut labore et molestiae consequatur, vel eum fugiat, quo pertineant non fuisse torquem detraxit hosti  :</Typography>
          <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Compléter mes informations"} handleClick={() => console.log("test confirme réponse")} />
        </Grid>
      </Dialog>
      <Dialog open={noProfileModaleOpen} onClose={handleNoProfileModaleOpen} classes={{ paper: classes.modale }}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleNoProfileModaleOpen}>
            <CloseIcon />
          </IconButton>
          <Typography variant={"h1"}>Aucun profil ne me convient</Typography>
          <Typography variant={"body1"} style={{ marginBottom: 20 }}>Afin de pouvoir améliorer nos futures propositions, n’hésitez pas à
                        nous dire la raison du refus de ces profils.</Typography>
          <CustomSelect placeholder={"Sélectionner raison"} label={"Raison"} optionsValues={['Compétences', "Tarifs", "Ce n’est pas ce que je cherche", "Le brief a changé", "Le projet a été annulé"]} value={noProfilSelect} handleChangeOut={setNoProfilSelect} />
          <CustomTextArea style={{ height: 241 }} placeholder={"Donnez nous plus de détails"} valueOut={noProfilMotif} handleChangeOut={setNoProfilMotif} />
          <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Confirmer et envoyer réponse"} handleClick={() => refuseAllProfiles()} loading={validateLoading} />
        </Grid>
      </Dialog>
      <Dialog open={validateChoiceModaleOpen} onClose={handleValidateChoiceModaleOpen} classes={{ paper: classes.modale }}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleValidateChoiceModaleOpen}>
            <CloseIcon />
          </IconButton>
          <Typography variant={"h1"}>Confirmation sélection</Typography>
          <Typography variant={"body1"} >Vous êtes sur le point de confirmer la sélection des profils.</Typography>
          <Typography variant={"body1"} style={{ marginBottom: 20 }}>En confirmant, vous recevrez un email sur <span style={{ color: "#ecf805" }}>prénomnom@entreprise.com</span> vous invitant à signer le devis.</Typography>
          <Typography variant={"body1"}>Dès la signature de ce dernier, vous pourrez accéder aux profils.</Typography>
          <Grid item container direction={"row"}>
            <CustomButton style={{ width: 183 }} theme={"filledButton"} title={"Confimer ma sélection"} handleClick={() => validateProfiles()} loading={validateLoading} />
          </Grid>
        </Grid>
      </Dialog>
      <Dialog open={contactOpen} onClose={handleContactOpen} classes={{ paper: classes.modale }}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleContactOpen}>
            <CloseIcon />
          </IconButton>
          <Typography variant={"h1"}>Faire une demande à acracy</Typography>
          <CustomSelect placeholder={"Sélectionner raison"} label={"Raison"} optionsValues={['Contacter Acracy']} value={contactSelect} handleChangeOut={setContactSelect} />
          <CustomTextArea style={{ height: 328 }} placeholder={"Dites nous comment on peut vous aider"} valueOut={contactMessage} handleChangeOut={setContactMessage} />
          <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Envoyé"} handleClick={() => contactAcracy(contactMessage, contactSelect, false, handleContactOpen)} loading={contactLoading} />
        </Grid>
      </Dialog>
      <Dialog open={interviewOpen} onClose={handleInterviewOpen} classes={{ paper: classes.modale }}>
        <Grid item container direction={'column'} justify={'center'} className={classes.modaleContainer}>
          <IconButton aria-label="close" className={classes.iconButton} onClick={handleInterviewOpen}>
            <CloseIcon />
          </IconButton>
          <Typography variant={"h1"}>Confirmation d'entretien</Typography>
          <CustomTextArea style={{ height: 328 }} placeholder={"Donnez nous plus de détails sur ces entretiens"} valueOut={interviewMessage} handleChangeOut={setInterviewMessage} />
          <CustomButton theme={"filledButton"} style={{ width: 254 }} title={"Envoyé"} handleClick={() => contactAcracy(interviewMessage, 'Interview', true, handleInterviewOpen)} loading={contactLoading} />
        </Grid>
      </Dialog>
    </Grid>

  );
};
export default ProfileSelection;
