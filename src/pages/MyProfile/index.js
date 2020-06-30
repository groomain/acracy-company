import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { myprofileLaunched } from '../../components/App/reducer';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../../components/Layout/Sidebar';
import Main from '../../components/Layout/Main';
import MyProfileForm from '../../components/Forms/MyProfileForm';
import styles from '../../utils/styles';
import Typography from '@material-ui/core/Typography';
import { CustomButton } from '../../components/Button';
import { CustomTextField, CustomPasswordField } from "../../components/Inputs/CustomTextField";
import CustomSelect from "../../components/Inputs/CustomSelect";
import Link from '@material-ui/core/Link';

const MyProfilePage = () => {
  //   const dispatch = useDispatch();
  //   const { t } = useTranslation();
  const classes = styles();

  // Form data
  // const initialValues = {
  //   firstName: '',
  //   lastName: '',
  //   role: '',
  //   phoneNumber: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   phonePrefix: 'Fr : +33'
  // };

  // Form Submitting Function
  // const myprofile = (credentials) => {
  //   dispatch(myprofileLaunched(credentials));
  // };

  // Form Validation Schema
  // const ValidationSchema = Yup.object().shape({
  //   email: Yup.string().required(),
  //   companyName: Yup.string().required(),
  //   firstName: Yup.string().required(),
  //   lastName: Yup.string().required(),
  //   role: Yup.string().required(),
  //   phoneNumber: Yup.number().required(),
  //   phonePrefix: Yup.string().required(),
  //   password: Yup.string().required(),
  //   confirmPassword: Yup.string().test('password-match', t('passwordMismatch'), function (confPass) {
  //     return confPass === this.parent.password;
  //   }).required(),
  //   conditions: Yup.bool().required(),
  // });

  // const [optionsValues] = useState([
  //   'Fr : +33',
  //   'Blg : +32',
  //   'It : +39'
  // ]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.connectionDiv}
    >
      <Sidebar>
        <div className={classes.pannel}>
          <Grid item>
            <Typography variant={"h1"}>
              Mon profil
          </Typography>
          </Grid>
          <Grid item>
            <Grid item>
              <Link href="#personalInfos">
                <Typography variant={"subtitle1"}>
                  | Informations personnelles
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="#password">
                <Typography variant={"subtitle2"}>
                  | Mot de passe
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Sidebar>
      <Main>
        <Grid item>
          <Typography variant={"h1"} id="personalInfos">
            Informations personnelles
          </Typography>
          <Typography variant={"h1"} id="password">
            Mot de passe
          </Typography>
        </Grid>
      </Main>
    </Grid >
  );
};

export default MyProfilePage;
