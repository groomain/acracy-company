import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import Main from "../../components/Layout/Main";
import Sidebar from "../../components/Layout/Sidebar";
import MissionSuivi from "../../components/MissionSuivi";
import Typography from "@material-ui/core/Typography";
import CheckableTag from "../../components/Tags/CheckableTag";
import CustomExpansionPanel from "../../components/CustomExpansionPanel";
import Tag from "../../components/Tags/Tag";
import CircleImage from "../../components/CircleImage";
import RevealProfil from "../../components/RevealProfil";
import CustomIconButton from "../../components/IconButton";
import infosIcon from '../../assets/icons/infos.svg'
import IconButton from "@material-ui/core/IconButton";

const tags = [{
    title: "Stratégie Annuelle Social Media",
}, {
    title: "Brief Créatif Social Media",
}, {
    title: "Social Listening"
}, {
    title: "Social Listening",
}, {
    title: "Livrable personnalisé",
}];

const tags2 = [{
    title: "Facebook",
}, {
    title: "Instagram",
}, {
    title: "SnapChat"
}, {
    title: "Brand Content",
}, {
    title: "Lorem ipsume",
}];

const tags3 = [{
    title: "Français natif",
}, {
    title: "Anglais courant",
}];

const tags4 = [{
    title: "Luxe",
}];

const MissionFollowUp = () => {
    const classes = styles();
    const dispatch = useDispatch();
    const {forgotPasswordStep} = useSelector(state => ({
        forgotPasswordStep: state.getIn(['app', 'forgotPasswordStep'])
    }));
    const {t} = useTranslation();
    const [step, setStepper] = React.useState(2);

    const renderContent = (step) => {
        if (step < 2) {
            return (
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} style={{
                    width: '100%',
                    height: 261,
                    backgroundColor: "#151d15",
                    borderRadius: 15,
                    textAlign: 'center',
                    padding: 20,
                    marginTop: 10,
                    marginBottom: 150
                }}>
                    <CircleImage theme={'avatarLarge'}/>
                    <Typography variant={'h4'} style={{marginTop: 10, marginBottom: 5}}>Matching en cours</Typography>
                    <Typography variant={'h4'} style={{color: '#565e56', width: "70%"}}>
                        Commencez par rechercher un type de profil ou livrable
                        pour démarrer un brief.</Typography>
                </Grid>
            )
        } else if (step >= 2 ) {
            return (
                <div className={classes.bloc}>
                    <Grid item container direction={'row'} justify={"space-between"} style={{ maxHeight: 80}}>
                        <Typography variant={'h2'} className={classes.titleFreelance}>Votre Freelance</Typography>
                          <div style={{display: 'flex'}}>
                              <Typography variant={'body2'}>Contact</Typography>
                            {/*<CustomIconButton  style={{maxHeight: 40, maxWidth: 40}}/>*/}
                              <IconButton
                                  edge={'end'}
                                  color="secondary" aria-label="notif"
                                  style={{maxHeight: 40, maxWidth: 40}}
                                  children={<span style={{
                                      width: 35,
                                      height: 35,
                                      backgroundImage: `url(${infosIcon})`,
                                      backgroundRepeat: 'no-repeat',
                                      content: '""',
                                  }} />}/>
                          </div>
                    </Grid>
                    <RevealProfil modeMission style={{width: 693, backgroundColor: '#151d15', borderRadius: 15, padding: 20}}/>
                </div>
            );
        }
    };

    return (
        <Grid
            container
            direction="row"

            className={classes.container}
        >
            <Main>
                <Grid container direction={'column'} style={{width: '95%', marginLeft: "5%", marginTop: 150}}>
                    <div className={classes.title}>
                    <Typography variant={'h1'}>Ma Mission</Typography>
                    </div>
                    <div className={classes.bloc}>
                    <Typography variant={'h2'} >Titre de la mission</Typography>
                    <Typography variant={'h1'}>Titre de la mission sur deux lignes ex eo ortum, tam egregios viros censes.
                        At vero eos et iusto odio
                        dignissimos.</Typography>
                    </div>
                </Grid>
                <Grid container direction={'row'} className={classes.card}>
                    <Grid container item xs={5} direction={'column'} spacing={2}>
                        <Grid item className={classes.blocTypoUp}>
                            <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                            <Typography variant={"body1"} className={classes.typo}>Télétravail
                                uniquement</Typography>
                        </Grid>
                        <Grid item className={classes.blocTypoDown}>
                            <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                            <Typography variant={"body1"} className={classes.typo}>Plein temps (5
                                jours)</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} direction={'column'} spacing={2}>
                        <Grid item className={classes.blocTypoUp}>
                            <Typography variant={"h4"} className={classes.typo}>Taux journalier</Typography>
                            <Typography variant={"body1"} className={classes.typo}>550 €/j</Typography>
                        </Grid>
                        <Grid item className={classes.blocTypoDown}>
                            <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                            <Typography variant={"body1"} className={classes.typo}>10 jours à partir du
                                20/05/20</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={2} direction={'column'} spacing={2}>
                        <Grid item container className={classes.blocTypoUp}>
                            <Typography variant={"h4"} className={classes.typo}>TJM</Typography>
                            <Typography variant={"body1"} className={classes.typo}>550 €/j</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction={'column'} style={{width: '95%', marginLeft: "5%"}}>
                    <div className={classes.bloc}>
                    <Typography variant={'h2'}>Livrable.s</Typography>
                    <div style={{width: '80%'}}>
                        {tags.map((tag, key) => <CheckableTag key={key} title={tag.title}/>)}
                    </div>
                    </div>
                        <div className={classes.bloc}>

                        <CustomExpansionPanel isTag={false} panelTitle="Contexte de la mission et tâches à réaliser">
                        <Typography>
                            Certe, inquam, pertinax non recusandae itaque aiunt hanc quasi naturalem atque corrupti,
                            quos. In oculis quidem exercitus quid ex eo delectu rerum, quem modo ista sis. Epicurus in
                            animis nostris inesse notionem, ut ipsi auctori huius disciplinae placet: constituam. Primum
                            igitur, quid et dolorem? sunt autem quidam e nostris,
                            qui in ea.
                        </Typography>
                    </CustomExpansionPanel>
                        </div>
                    <div className={classes.bloc}>

                    <CustomExpansionPanel isTag={false} panelTitle="Détails des livrables">
                        <Typography>
                            Sed ut labore et molestiae consequatur, vel eum fugiat, quo pertineant non fuisse torquem
                            detraxit hosti et quidem faciunt, ut et accurate disserendum et dolorem? sunt autem quidam e
                            nostris, qui studiose antiqua persequeris, claris et fortibus viris commemorandis.

                            Primum igitur, inquit, modo dixi, constituto, ut dolore disputandum putant sed ut de
                            utilitatibus, nihil oportere exquisitis rationibus confirmare, tantum satis esse fugiendum
                            itaque aiunt hanc quasi involuta aperiri, altera prompta et voluptatem ut enim ipsam causam
                            ista, quae.

                            - Quid ex eo ortum, tam inportuno tamque crudeli
                            - Sin, ut enim inter argumentum conclusionemque
                            - Rationis et accurate disserendum et dolore disputandum putant
                            - Sed ut ipsi auctori huius disciplinae placet: constituam, quid est et benivole collegisti,
                            nec in liberos atque
                        </Typography>
                    </CustomExpansionPanel>
                    </div>
                    <div className={classes.bloc}>
                    <Typography variant={'h2'}>Détails du profil recherché</Typography>
                    <Typography variant={'h1'}>Social Media Strategist</Typography>
                    </div>
                    <div className={classes.bloc}>
                    <Typography variant={'h4'} className={classes.title}>Expertises clés du profil</Typography>
                    <Grid item container direction={"row"} spacing={1}>
                        {tags2.map((tag, key) => <Grid item><Tag key={key} title={tag.title} isPrimaryColor
                                                                 tagType="Prioritaire" isWithCheckbox/></Grid>)}
                    </Grid>
                    </div>
                    <div className={classes.bloc}>
                    <Typography variant={'h4'} className={classes.title}>Langue souhaitée</Typography>
                    <Grid style={{width: '80%'}} item container direction={"row"} spacing={1}>
                        {tags3.map((tag, key) => <Grid item><Tag key={key} title={tag.title} isPrimaryColor
                                                                 tagType="Critère indispensable"
                                                                 isWithCheckbox/></Grid>)}
                    </Grid>
                    </div>
                    <div className={classes.bloc}>
                    <Typography variant={'h4'} className={classes.title}>Sensibilité souhaitée</Typography>
                    <Grid style={{width: '80%'}} item container direction={"row"} spacing={1}>
                        {tags4.map((tag, key) => <Grid item>
                            <Tag key={key} title={tag.title} isPrimaryColor
                                                                 tagType="Critère indispensable"
                                                                 isWithCheckbox/></Grid>)}
                    </Grid>
                    </div>
                    <div className={classes.bloc}>
                    <Typography variant={'h4'}>Séniorite souhaitée</Typography>
                    <Typography variant={'h4'}
                                style={{width: '100%', padding: 30, backgroundColor: "#283028", borderRadius: 15}}>Senior
                        (plus de 5 ans d'experience)</Typography>
                    </div>
                </Grid>
                {renderContent(step)}
                    </Main>
            <Sidebar>
            <MissionSuivi step={step} style={{marginTop: 150}}/>
            </Sidebar>
        </Grid>
    );
};

export default MissionFollowUp
;
