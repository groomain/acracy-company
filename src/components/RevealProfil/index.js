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

const RevealProfil = ({setCheckedProfiles, index, modeMission, profil, ...props}) => {
  const classes = styles();
  const photoLink = 'https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg';
  const [checked, setChecked] = React.useState(false);

  return (
      <div className={classes.root} {...props}>
        <Grid container direction={"column"} justify={'center'}>
          <Grid container direction="row" justify={'center'} xs={12} className={classes.upCard}>
            <Grid item xs={4}>
              {checked && <img src={checkStatus} alt="checked" className={classes.avatarContainer}/>}
              <Avatar src={photoLink} className={classes.avatar}/>
            </Grid>
            <Grid item xs={8} direction={"column"} justify={'center'}>
              <Grid item className={classes.tagPreSelect}>
              {checked && <Tag title="Profil pré-sélectionné" isPrimaryColor />}
              </Grid>
              <Typography className={classes.name}>Anh-Dao</Typography>
              <Typography variant={"body1"} className={classes.profession}>Social Media Strategist</Typography>
              <Grid item container direction={"row"} className={classes.checkContainer} justify={'space-between'} alignItems="center" >
                <Grid item>
                <Typography variant={"body2"} className={classes.noSelect}>Profil non séléctionné</Typography>
                </Grid>
                <Grid item>
                <CustomSwitch className={classes.switch} checked={checked} setChecked={setChecked} onChange={() => setCheckedProfiles(index)} switchSize="large"/>
                </Grid>
                <Grid item>
                <Typography variant={"body2"} className={clsx(classes.preSelect, { [classes.selected]: checked})}>Profil pré-sélectionné</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
            {modeMission &&
          <Grid container direction={"row"} justify={'center'} alignItems="center"  xs={12} className={classes.customButtonContainer}>
            <Grid xs={4} item container justify={'center'}>
            <CustomButton xs={4} title={'Voir son CV'} style={{marginRight: 'auto', width: 215}}/>
            </Grid>
            <Grid  xs={4} item container justify={'center'}>
            <CustomButton title={'Voir son Portfolio'} style={{margin: 'auto', width: 215}}/>
            </Grid>
            <Grid xs={4} item container justify={'center'}>
            <CustomButton title={'Voir son Site'} style={{marginLeft: 'auto', width: 215}}/>
            </Grid>
          </Grid>
            }
          <Grid item className={classes.textContainer}>
            <Typography className={classes.text}>
              Bahia est Illustratrice et Directrice Artistique depuis 10 ans, et en freelance depuis peu.
              Ce qu’elle aime avant tout : raconter des histoires. Son style léger, coloré, élégant et drôle est reconnaissable, mais elle sait s’adapter naturellement aux demandes et exigences de ses clients.
            </Typography>
            <Typography className={classes.text}>
              DA et graphiste par ailleurs, elle comprend les enjeux de la communication des marques, et a l’habitude de travailler avec des motion designers et animateurs. Enthousiaste, experte et chaleureuse, elle est très intéressée par le projet. Le tarif proposé est un forfait pour toute la mission.
            </Typography>
          </Grid>
          <Grid container direction={'row'} alignItems={'center'} className={classes.authorContainer}>
            <CircleImage src={"https://cdn-media.rtl.fr/cache/p0NFoli1OBEqRtMwTbdztw/880v587-0/online/image/2015/0403/loveok_141338438169183900.jpg"}/>
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
                  <Grid  container direction={"row"} justify={'center'} className={classes.tagContainer}>
                    <Tag title="Influence" isPrimaryColor className={classes.tag}/>
                    <Tag title="Brand Content" isPrimaryColor className={classes.tag}/>
                    <Tag title="Présentation écrite" isPrimaryColor className={classes.tag}/>
                    <Tag title="Activation" className={classes.tag}/>
                    <Tag title="Créativité" className={classes.tag}/>
                  </Grid>
              </Grid>

            <Grid item container xs={6} direction={"column"} justify={'space-between'} spacing={0} className={classes.profilElementContainer}>
                <Grid container spacing={1} item className={classes.profilElementItem}>
                  <ProfileElement
                      category='Sensibilité'
                      item1='Activation'
                      item2='sensation'
                  />
                </Grid>
                <Grid container spacing={1} item className={classes.profilElementItem}>
                  <ProfileElement
                      category='Langues'
                      item1='Anglais courant'
                      item2='Italien Natif'
                      item3=''
                  />
                </Grid>
                <Grid container spacing={1} item className={classes.profilElementItem}>
                  <ProfileElement
                      category='Séniorité'
                      item1="(plus de 5 ans d'expérience)"
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
