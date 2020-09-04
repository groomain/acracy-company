import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { Typography, Box, Grid } from '@material-ui/core/';
import CustomSwitch from "../../components/Switch";
import Tag from "../../components/Tags/Tag";
import CheckableTag from "../../components/Tags/CheckableTag";
import CircleImage from "../CircleImage";
import CustomButton from "../Button";
import Avatar from "@material-ui/core/Avatar";
import ProfileElement from "../ProfileElement";
import star from "../../assets/icons/expertises.svg";
import checkStatus from "../../assets/icons/check-statut.svg";
import CustomLoader from "../Loader";
// Pics
import severine from '../../assets/pics/severine/severine-small.png';
// Services
import { formatLanguagesValues, formatSeniorityType } from '../../utils/services/format';
import { downloadFileLaunched } from "../DownloadModal/reducer";
import styles from './styles'

const RevealProfil = ({ setCheckedProfiles, index, modeMission, profil, acracyBlurb, ...props }) => {
  const classes = styles();
  const [checked, setChecked] = React.useState(false);
  const PORTFOLIO_LINK = profil?.portfolioLink;
  const PORTFOLIO_UPLOAD = profil?.portfolioUpload && profil?.portfolioUpload[0]?.externalId;
  const LINKEDIN_LINK = profil?.linkedinLink;
  const dispatch = useDispatch();

  const downloadFile = (payload) => {
    dispatch(downloadFileLaunched(payload));
  };

  const { fileLoading } = useSelector(state => ({
    fileLoading: state.getIn(['Download', 'fileLoading']),
  }));

  return (
    <div className={clsx(classes.root, { [classes.rootModeMission]: modeMission })}>
      {profil ?
        <Grid container direction={"column"} justify={'center'}>
          <Grid container direction={"column"} justify={'center'}
            className={clsx(classes.firstBlock, { [classes.firstBlockModeMission]: modeMission })}>
            <Grid container direction="row" justify={'center'} xs={12} className={classes.upCard}>
              <Grid item xs={4}>
                {checked && <img src={checkStatus} alt="checked" className={classes.avatarContainer} />}
                <Avatar src={profil?.linkedinAvatar}
                  className={clsx(classes.avatar, { [classes.avatarModeMission]: modeMission })} />
              </Grid>
              <Grid item xs={8} direction={"column"} justify={'center'}>
                <Grid item className={classes.tagPreSelect}>
                  {checked && <Grid container>
                    <Tag title="Profil pré-sélectionné" isPrimaryColor />
                  </Grid>}
                </Grid>
                <Typography
                  className={clsx(classes.name, { [classes.nameModeMission]: modeMission })}>{profil?.firstName} {profil?.lastName}</Typography>
                <Typography variant={"body1"} className={classes.profession}>{profil?.profile.text}</Typography>
                {!modeMission &&
                  <Grid item container direction={"row"} className={classes.checkContainer} justify={'space-between'}
                    alignItems="center">
                    <Grid item>
                      <Typography variant={"body2"} className={classes.noSelect}>Profil non séléctionné</Typography>
                    </Grid>
                    <Grid item>
                      <CustomSwitch className={classes.switch} checked={checked} setChecked={setChecked} onChange={() => setCheckedProfiles(index)}
                        switchSize="large" />
                    </Grid>
                    <Grid item>
                      <Typography variant={"body2"}
                        className={clsx(classes.preSelect, { [classes.selected]: checked })}>Profil
                          pré-sélectionné</Typography>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
            <Grid container direction={"row"} justify={'center'} alignItems="center" xs={12}
              className={clsx(classes.customButtonContainer, { [classes.customButtonContainerModeMission]: modeMission })}>

              <Grid xs={4} item container justify={'center'}>
                <CustomButton title={'Voir son CV'}
                  handleClick={() => { return window.open(LINKEDIN_LINK, '_blank') }}
                  className={clsx(classes.customButton, { [classes.customButtonModeMission]: modeMission })}
                  disabled={!LINKEDIN_LINK}
                  theme={!LINKEDIN_LINK && "disabledOutlined"}
                />
              </Grid>

              <Grid xs={4} item container justify={'center'}>
                <CustomButton xs={4} title={'Voir son Portfolio'}
                  handleClick={() => downloadFile({ attachmentId: PORTFOLIO_UPLOAD })}
                  className={clsx(classes.customButtonLeft, { [classes.customButtonModeMission]: modeMission })}
                  disabled={!PORTFOLIO_UPLOAD}
                  theme={!PORTFOLIO_UPLOAD && "disabledOutlined"}
                  loading={fileLoading}
                />
              </Grid>

              <Grid xs={4} item container justify={'center'}>
                <CustomButton title={'Voir son Site'}
                  handleClick={() => { return window.open(PORTFOLIO_LINK, '_blank') }}
                  className={clsx(classes.customButtonRight, { [classes.customButtonModeMission]: modeMission })}
                  disabled={!PORTFOLIO_LINK}
                  theme={!PORTFOLIO_LINK && "disabledOutlined"}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.textContainer}>
              <Typography className={clsx(classes.text, { [classes.textModeMission]: modeMission })}>
                {acracyBlurb}
              </Typography>
            </Grid>
            {!modeMission &&
              <Grid container direction={'row'} alignItems={'center'} className={classes.authorContainer}>
                <CircleImage src={severine} />
                <Typography variant="body2" className={classes.authorTypo}>le Blurb de Séverine</Typography>
              </Grid>}
          </Grid>
          <Grid container direction={"row"} justify={'space-between'} spacing={1} xs={12}>

            <Grid item container xs={6} justify={'center'} alignItems="center" className={clsx(classes.blackCard, { [classes.blackCardModeMission]: modeMission })}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Box my={1}>
                  <img src={star} alt="Star" />
                </Box>
                <Grid item>
                  <Typography variant='h4'>Expertises</Typography>
                </Grid>
              </Grid>
              <Grid container direction={"row"} justify={'center'}>
                {profil?.expertises?.map((item, index) =>
                  <CheckableTag key={index} title={item.expertise.text} checked={item.priority} isDisabled />
                )}
                {profil?.expertises?.map((item, index) =>
                  <CheckableTag key={index} title={item.expertise.text} checked={item.priority} isDisabled />
                )}
                {/*<Tag title="Influence" isPrimaryColor className={classes.tag}/>*/}
                {/*<Tag title="Brand Content" isPrimaryColor className={classes.tag}/>*/}
                {/*<Tag title="Présentation écrite" isPrimaryColor className={classes.tag}/>*/}
                {/*<Tag title="Activation" className={classes.tag}/>*/}
                {/*<Tag title="Créativité" className={classes.tag}/>*/}
              </Grid>
            </Grid>

            <Grid item container xs={6} direction={"column"} justify={'space-between'} spacing={0}
              className={clsx(classes.profilElementContainer, { [classes.profilElementContainerModeMission]: modeMission })}>
              <Grid container spacing={1} item
                className={clsx(classes.profilElementItem, { [classes.profilElementItemModeMission]: modeMission })}>
                <ProfileElement
                  category='Sensibilité'
                  item1={profil?.sensitivity[0]?.text}
                  item2={profil?.sensitivity[1] ? profil?.sensitivity[1].text : undefined}
                  modeMission={modeMission}
                />
              </Grid>
              <Grid container spacing={1} item
                className={clsx(classes.profilElementItem, { [classes.profilElementItemModeMission]: modeMission })}>
                <ProfileElement
                  category='Langues'
                  item1={profil?.languages && formatLanguagesValues(profil?.languages[0])}
                  item2={(profil?.languages && profil?.languages[1]) ? formatLanguagesValues(profil?.languages[1]) : undefined}
                  modeMission={modeMission}
                />
              </Grid>
              <Grid container spacing={1} item
                className={clsx(classes.profilElementItem, { [classes.profilElementItemModeMission]: modeMission })}>
                <ProfileElement
                  category='Séniorité'
                  item1={formatSeniorityType(profil?.seniority)}
                  modeMission={modeMission}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        :
        <CustomLoader />
      }
    </div>);
};

export default RevealProfil;
