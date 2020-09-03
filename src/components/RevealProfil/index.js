import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomSwitch from "../../components/Switch";
import Tag from "../../components/Tags/Tag";
import CircleImage from "../CircleImage";
import CustomButton from "../Button";
import styles from './styles'
import Avatar from "@material-ui/core/Avatar";
import ProfileElement from "../ProfileElement";
import star from "../../assets/icons/expertises.svg";
import checkStatus from "../../assets/icons/check-statut.svg";
import clsx from "clsx";
import CustomLoader from "../Loader";
import CustomAppBar from '../AppBar';

const RevealProfil = ({ setCheckedProfiles, index, modeMission, profil, ...props }) => {
  const classes = styles();
  const [checked, setChecked] = React.useState(false);

  return (
    <div className={clsx(classes.root, { [classes.rootModeMission]: modeMission })}>
      <CustomAppBar path='/home' />
      {profil ?
        <Grid container direction={"column"} justify={'center'}>
          <Grid container direction={"column"} justify={'center'} alignItems={'center'}
            className={clsx(classes.firstBlock, { [classes.firstBlockModeMission]: modeMission })}>
            <Grid container direction="row" justify={'center'} xs={12} className={classes.upCard}>
              <Grid item xs={4}>
                {checked && <img src={checkStatus} alt="checked" className={classes.avatarContainer} />}
                <Avatar src={profil?.linkedinAvatar}
                  className={clsx(classes.avatar, { [classes.avatarModeMission]: modeMission })} />
              </Grid>
              <Grid item xs={8} direction={"column"} justify={'center'}>
                <Grid item className={classes.tagPreSelect}>
                  {checked && <Tag title="Profil pré-sélectionné" isPrimaryColor />}
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
                <CustomButton xs={4} title={'Voir son CV'}
                  handleClick={() => { return window.location.href = profil?.linkedinLink }}
                  className={clsx(classes.customButtonLeft, { [classes.customButtonModeMission]: modeMission })} />
              </Grid>
              <Grid xs={4} item container justify={'center'}>
                <CustomButton title={'Voir son Portfolio'}
                  handleClick={() => { return window.location.href = profil?.portfolioLink }}
                  className={clsx(classes.customButton, { [classes.customButtonModeMission]: modeMission })} />
              </Grid>
              <Grid xs={4} item container justify={'center'}>
                <CustomButton title={'Voir son Site'}
                  handleClick={() => { return window.location.href = profil?.linkedinLink }}
                  className={clsx(classes.customButtonRight, { [classes.customButtonModeMission]: modeMission })} />
              </Grid>
            </Grid>
            <Grid item className={classes.textContainer}>
              <Typography className={clsx(classes.text, { [classes.textModeMission]: modeMission })}>
                {profil?.acracyBlurb}
              </Typography>
            </Grid>
            {!modeMission &&
              <Grid container direction={'row'} alignItems={'center'} className={classes.authorContainer}>
                <CircleImage />
                <Typography variant="body2" className={classes.authorTypo}>le Blurb de Séverine</Typography>
              </Grid>}
          </Grid>
          <Grid container direction={"row"} justify={'space-between'} spacing={1} xs={12}>

            <Grid item container xs={6} direction="column" justify={'center'} className={clsx(classes.blackCard, { [classes.blackCardModeMission]: modeMission })}>
              <Grid item className={classes.star}>
                <img src={star} alt="Star" />
              </Grid>
              <Grid item>
                <Typography variant='h4'>Expertises</Typography>
              </Grid>
              <Grid container direction={"row"} justify={'center'} className={classes.tagContainer}>
                {
                  profil?.expertises?.map((item, index) =>
                    <Tag title={item.expertise.text} className={classes.tag} isPrimaryColor={item.priority} />
                  )
                }
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
                  item1={profil?.languages[0]}
                  item2={profil?.languages[1] ? profil?.languages[1] : undefined}
                  modeMission={modeMission}
                />
              </Grid>
              <Grid container spacing={1} item
                className={clsx(classes.profilElementItem, { [classes.profilElementItemModeMission]: modeMission })}>
                <ProfileElement
                  category='Séniorité'
                  item1={profil?.seniority}
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
