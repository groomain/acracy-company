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

const RevealProfil = ({ setCheckedProfiles, index, modeMission, profil, ...props }) => {
  const classes = styles();
  const [checked, setChecked] = React.useState(false);

  return (
    <div className={classes.root} {...props}>
      <Grid container direction={"column"} justify={'center'}>
        <Grid container direction="row" justify={'center'} xs={12} className={classes.upCard}>
          <Grid item xs={4}>
            {checked && <img src={checkStatus} alt="checked" className={classes.avatarContainer} />}
            <Avatar src={profil.linkedinAvatar} className={classes.avatar} />
          </Grid>
          <Grid item xs={8} direction={"column"} justify={'center'}>
            <Grid item className={classes.tagPreSelect}>
              {checked && <Tag title="Profil pré-sélectionné" isPrimaryColor />}
            </Grid>
            <Typography className={classes.name}>{profil.firstName} {profil.lastName}</Typography>
            <Typography variant={"body1"} className={classes.profession}>{profil.profile.text}</Typography>
            <Grid item container direction={"row"} className={classes.checkContainer} justify={'space-between'} alignItems="center" >
              <Grid item>
                <Typography variant={"body2"} className={classes.noSelect}>Profil non séléctionné</Typography>
              </Grid>
              <Grid item>
                <CustomSwitch className={classes.switch} checked={checked} setChecked={setChecked} onChange={() => setCheckedProfiles(index)} switchSize="large" />
              </Grid>
              <Grid item>
                <Typography variant={"body2"} className={clsx(classes.preSelect, { [classes.selected]: checked })}>Profil pré-sélectionné</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction={"row"} justify={'center'} alignItems="center" xs={12} className={classes.customButtonContainer}>
          <Grid xs={4} item container justify={'center'}>
            <a href={profil.linkedinLink} target="_blank" rel="noopener noreferrer">
              <CustomButton xs={4} title={'Voir son CV'} style={{ marginRight: 'auto', width: 215 }} />
            </a>
          </Grid>
          <Grid xs={4} item container justify={'center'}>
            <a href={profil.portfolioLink} target="_blank" rel="noopener noreferrer">
              <CustomButton title={'Voir son Portfolio'} style={{ margin: 'auto', width: 215 }} />
            </a>
          </Grid>
          <Grid xs={4} item container justify={'center'}>
            <a href={profil.webSite} target="_blank" rel="noopener noreferrer">
              <CustomButton title={'Voir son Site'} style={{ marginLeft: 'auto', width: 215 }} />
            </a>
          </Grid>
        </Grid>

        <Grid item className={classes.textContainer}>
          <Typography className={classes.text}>
            {profil.acracyBlurb}
          </Typography>
        </Grid>
        <Grid container direction={'row'} alignItems={'center'} className={classes.authorContainer}>
          <CircleImage src={"https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg"} />
          <Typography variant="body2" className={classes.authorTypo}>le Blurb de Séverine</Typography>
        </Grid>

        <Grid container direction={"row"} justify={'space-between'} spacing={1} xs={12}>

          <Grid item container xs={6} direction="column" justify={'center'} className={classes.blackCard}>
            <Grid item className={classes.star}>
              <img src={star} alt="Star" />
            </Grid>
            <Grid item>
              <Typography variant='h4'>Expertises</Typography>
            </Grid>
            <Grid container direction={"row"} justify={'center'} className={classes.tagContainer}>
              {
                profil.expertises.map((item, index) =>
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

          <Grid item container xs={6} direction={"column"} justify={'space-between'} spacing={0} className={classes.profilElementContainer}>
            <Grid container spacing={1} item className={classes.profilElementItem}>
              <ProfileElement
                category='Sensibilité'
                item1={profil.sensitivity[0]?.text}
                item2={profil.sensitivity[1]?.text}
              />
            </Grid>
            <Grid container spacing={1} item className={classes.profilElementItem}>
              <ProfileElement
                category='Langues'
                item1={profil.languages[0]}
                item2={profil.languages[1]}
                item3={profil.languages[2]}
              />
            </Grid>
            <Grid container spacing={1} item className={classes.profilElementItem}>
              <ProfileElement
                category='Séniorité'
                item1={profil.seniority}
                item2=''
                item3=''
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>);
};

export default RevealProfil;
