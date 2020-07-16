import React, { useEffect } from 'react';
import { Grid } from "@material-ui/core";
import MyProfileMenu from "../../components/MyProfile";
import CustomAppbar from '../../components/AppBar'
import styles from "./styles";
import * as Scroll from "react-scroll/modules";

import { Formik } from 'formik';
import PersonalInformationsForm from '../../components/Forms/MyProfileForm/PersonalInformationsForm';
import PasswordForm from '../../components/Forms/MyProfileForm/PasswordForm';
import { handleCurrentStep } from '../../components/App/reducer';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMyProfilePersonalInformationsLaunched,
  putMyProfilePersonalInformationsLaunched,
  changePasswordLaunched
} from './reducer';
import { getAreaCodeFromNumber } from '../../utils/services/format';

export const MyProfilePage = (props) => {
  const classes = styles();
  const Element = Scroll.Element;
  const scrollSpy = Scroll.scrollSpy;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    scrollSpy.update();
    dispatch(handleCurrentStep(0));
  }, [dispatch]);

  const { myProfileData, employeeId, user } = useSelector(state => ({
    myProfileData: state.getIn(['MyProfile', 'myProfileData']),
    employeeId: state.getIn(['app', 'userDynamo', 'employeeId']),
    user: state.getIn(['app', 'userInfo', 'attributes', 'sub'])
  }));

  // Form Validation Schema
  const personalInformationsValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneCode: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    role: Yup.string().required()
  });

  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required(),
    confirmNewPassword: Yup.string().test('newPassword-match', t('newPasswordMismatch'), function (confNewPass) {
      return confNewPass === this.parent.newPassword;
    }).required()
  });

  useEffect(() => {
    dispatch(getMyProfilePersonalInformationsLaunched());
  }, [dispatch]);

  // Form data
  const personalInformationsInitialValues = {
    employeeId: employeeId,
    firstName: myProfileData?.firstName,
    lastName: myProfileData?.lastName,
    email: myProfileData?.email,
    phoneCode: myProfileData?.phone?.code ? getAreaCodeFromNumber(myProfileData?.phone?.code) : null,
    phoneNumber: myProfileData?.phone?.number,
    role: myProfileData?.role
  };

  const passwordInitialValues = {
    user: user,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  // Form Submitting Function
  const personalInformationsSubmit = (credentials) => {
    dispatch(putMyProfilePersonalInformationsLaunched(credentials));
  };

  const passwordSubmit = (credentials) => {
    dispatch(changePasswordLaunched(credentials));
  };

  return (
    <Grid item xs={12} container className={classes.container}>
      <CustomAppbar path='/home' />
      <Grid item xs={3} container justify={'center'} className={classes.leftContainer}>
        <MyProfileMenu />
      </Grid>
      <Grid item xs={9} container alignItems={'center'} justify={'center'} style={{ marginBottom: 500 }}>
        <Element name={'1'} className={classes.element}>
          <Formik
            render={props => <PersonalInformationsForm {...props} />}
            initialValues={personalInformationsInitialValues}
            validationSchema={personalInformationsValidationSchema}
            enableReinitialize
            onSubmit={personalInformationsSubmit}
          />
        </Element>
        <Element name={'2'} className={classes.element}>
          <Formik
            render={props => <PasswordForm {...props} />}
            initialValues={passwordInitialValues}
            validationSchema={passwordValidationSchema}
            enableReinitialize
            onSubmit={passwordSubmit}
          />
        </Element>
      </Grid>
    </Grid>
  )
};

export default MyProfilePage;