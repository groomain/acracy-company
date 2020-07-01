import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import Main from "../../components/Layout/Main";
import Sidebar from "../../components/Layout/Sidebar";
import MissionSuivi from "../../components/MissionSuivi";
import Typography from "@material-ui/core/Typography";
import CustomExpansionPanel from "../../components/CustomExpansionPanel";
import Tag from "../../components/Tags/Tag";
import CircleImage from "../../components/CircleImage";
import RevealProfil from "../../components/RevealProfil";
import infosIcon from '../../assets/icons/infos.svg'
import matchIcon from '../../assets/icons/match.svg'
import IconButton from "@material-ui/core/IconButton";
import {getBriefLaunched, getMissionLaunched} from "./reducer";
import CustomLoader from "../../components/Loader";
import {useLocation} from "react-router";

const MissionFollowUp = (props) => {
    const classes = styles();
    const dispatch = useDispatch();
    const id = props?.match?.params;
    let location = useLocation();
    const {t} = useTranslation();

    const {briefData, missionData} = useSelector(state => ({
        briefData: state.getIn(['Mission', 'briefData']),
        missionData: state.getIn(['Mission', 'missionData'])
    }));
    const data = missionData || (briefData &&
        {
            externalId: briefData.externalId,
            status: briefData.status,
            brief: {
                profile: briefData.profile,
                deliverables: briefData.deliverables,
                missionContext: briefData.missionContext,
                missionDetail: briefData.missionDetail,
                missionRequirements: briefData.missionRequirements
            },
            customerProfile: briefData.customerProfile
        });

    useEffect( () => {
        const isMission = location.pathname?.includes('mission');
        if (isMission) {
            dispatch(getMissionLaunched(id));
        } else {
            dispatch(getBriefLaunched(id));
        }
    }, []);

    const renderContent = (status) => {
        switch (status) {
            case 'WAITING_FOR_ACCEPTANCE':
            case 'WAITING_FOR_MATCHING':
            case 'WAITING_FOR_CUSTOMER_SELECTION':
            case 'WAITING_FOR_QUOTES':
            default:
                return (
                    <Grid container direction={'column'} justify={'center'} alignItems={'center'} className={classes.waitingProfile}>
                        <CircleImage theme={'avatarLarge'} src={matchIcon}/>
                        <Typography variant={'h4'} className={classes.waitingProfilTitle}>Matching en cours</Typography>
                        <Typography variant={'h4'} className={classes.waitingProfileText}>
                            Commencez par rechercher un type de profil ou livrable
                            pour démarrer un brief.</Typography>
                    </Grid>
                );
            case 'IN_PROGRESS':
                return (
                    <div className={classes.bloc}>
                        <Grid item container direction={'row'} justify={"space-between"} className={classes.infoContainer}>
                            <Typography variant={'h2'} className={classes.titleFreelance}>Votre Freelance</Typography>
                            <div style={{display: 'flex'}}>
                                <Typography variant={'body2'}>Contact</Typography>
                                <IconButton
                                    edge={'end'}
                                    color="secondary" aria-label="notif"
                                    style={{bottom: 23}}
                                    children={<span style={{
                                        width: 40,
                                        height: 40,
                                        backgroundImage: `url(${infosIcon})`,
                                        backgroundRepeat: 'no-repeat',
                                        content: '""',
                                    }}/>}/>
                            </div>
                        </Grid>
                        {missionData &&
                        <RevealProfil
                            profil={missionData.serviceProviderProfile}
                            modeMission
                            style={{width: 693, backgroundColor: '#151d15', borderRadius: 15, padding: 20}}/>
                        }
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
                {data ?
                    <Grid>
                        <Grid container direction={'column'} className={classes.containerWithMargin}>
                            <div className={classes.title}>
                                <Typography variant={'h1'}>Ma Mission</Typography>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h2'}>Titre de la mission</Typography>
                                <Typography variant={'h1'}>{data.brief.missionContext.title}</Typography>
                            </div>
                        </Grid>
                        <Grid container direction={'row'} className={classes.card}>
                            <Grid container item xs={5} direction={'column'} spacing={2}>
                                <Grid item className={classes.blocTypoUp}>
                                    <Typography variant={"h4"} className={classes.typo}>Format</Typography>
                                    <Typography variant={"body1"}
                                                className={classes.typo}>{data.brief.missionContext.format}</Typography>
                                </Grid>
                                <Grid item className={classes.blocTypoDown}>
                                    <Typography variant={"h4"} className={classes.typo}>Rythme</Typography>
                                    <Typography variant={"body1"}
                                                className={classes.typo}>{data.brief.missionContext.weeklyRythm}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={5} direction={'column'} spacing={2}>
                                <Grid item className={classes.blocTypoUp}>
                                    <Typography variant={"h4"} className={classes.typo}>Durée</Typography>
                                    <Typography variant={"body1"}
                                                className={classes.typo}>{data.brief.missionContext.duration.nb}
                                        {data.brief.missionContext.duration.nb} à partir
                                        du {data.brief.missionContext.startDate}</Typography>
                                </Grid>
                                <Grid item className={classes.blocTypoDown}>
                                    <Typography variant={"h4"} className={classes.typo}>Adresse</Typography>
                                    <Typography variant={"body1"}
                                                className={classes.typo}>{data.brief.missionContext.address}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={2} direction={'column'} spacing={2}>
                                <Grid item container className={classes.blocTypoUp}>
                                    <Typography variant={"h4"} className={classes.typo}>TJM</Typography>
                                    <Typography variant={"body1"}
                                                className={classes.typo}>{data.brief.missionContext.estimatedAverageDailyRate} €/j</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container direction={'column'} className={classes.containerWithMargin2}>
                            <div className={classes.bloc}>
                                <Typography variant={'h2'}>Livrable.s</Typography>
                                <Grid container direction={'row'} className={classes.deliverablesContainer} spacing={1}>
                                    {data.brief.deliverables.map((tag, key) =>
                                        <Grid item>
                                            <Tag key={key} title={tag.text} isPrimaryColor={false}/>
                                        </Grid>)}
                                </Grid>
                            </div>
                            <div className={classes.bloc}>
                                <CustomExpansionPanel isTag={false}
                                                      panelTitle="Contexte de la mission et tâches à réaliser">
                                    <Typography>
                                        {data.brief.missionDetail.contextAndTasks}
                                    </Typography>
                                </CustomExpansionPanel>
                            </div>
                            <div className={classes.bloc}>

                                <CustomExpansionPanel isTag={false} panelTitle="Détails des livrables">
                                    <Typography>
                                        {data.brief.missionDetail.DetailsOfDeliverables}
                                    </Typography>
                                </CustomExpansionPanel>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h2'}>Détails du profil recherché</Typography>
                                <Typography variant={'h1'}>{data.brief.profile.text}</Typography>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Expertises clés du
                                    profil</Typography>
                                <Grid item container direction={"row"} spacing={1}>
                                    {data.brief.missionRequirements.expertises.map((tag, key) => <Grid item><Tag
                                        key={key} title={tag.expertise.text} isPrimaryColor
                                        tagType="Prioritaire" isWithCheckbox checked={tag.priority}/></Grid>)}
                                </Grid>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Langue souhaitée</Typography>
                                <Grid style={{width: '80%'}} item container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <Tag title={data.brief.missionRequirements.languages.language}
                                             isPrimaryColor
                                             tagType="Critère indispensable"
                                             isWithCheckbox
                                             checked={data.brief.missionRequirements.languages.essential}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.bloc}>
                                <Typography variant={'h4'} className={classes.title}>Sensibilité souhaitée</Typography>
                                <Grid style={{width: '80%'}} item container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <Tag title={data.brief.missionRequirements.sensitivity.sensitivity.text}
                                             isPrimaryColor
                                             tagType="Critère indispensable"
                                             isWithCheckbox
                                             checked={data.brief.missionRequirements.sensitivity.essential}
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
                                            }}>{data.brief.missionRequirements.seniority}</Typography>
                            </div>
                        </Grid>
                        {renderContent(data.status)}
                    </Grid>
                    :
                    <Grid container justify={'center'} alignItems={'center'} style={{minHeight: '100vh'}}><CustomLoader/></Grid>
                }
            </Main>
            <Sidebar>
                {data &&
                <MissionSuivi data={data} pathname={location.pathname} style={{marginTop: 150}}/>
                }
            </Sidebar>
        </Grid>
    );
};

export default MissionFollowUp
;
