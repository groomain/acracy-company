import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSwitch from "../../Switch";
import Grid from "@material-ui/core/Grid";
import charte from "../../../assets/icons/charte.svg";
import CustomCheckBox from "../../CheckBox";
// import CustomCheckbox from "../../Forms/SignUpForm";
import { checkMissingInfosForm5 } from '../../../pages/AdministrativePage/reducer';
import { getIn } from "formik";
import CustomTextField from "../Form4";

export const Form5 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();

  const { companyUpdateLoading, administrativeProfileFromDB } = useSelector(state => ({
    companyUpdateLoading: state.getIn(['Administrative', 'companyUpdateLoading']),
    administrativeProfileFromDB: state.getIn(['Administrative', 'companyData', 'administrativeProfile'])
  }));
  const { administrativeProfile } = values;

  const [switchOrders, setSwitchOrders] = useState(false);
  const [checked, setChecked] = useState(administrativeProfileFromDB?.cguCheck);

  useEffect(() => {
    if (administrativeProfile.cguCheck === true) {
      dispatch(checkMissingInfosForm5(true));
    } else {
      dispatch(checkMissingInfosForm5(false))
    }
  }, [administrativeProfile.cguCheck]);

  useEffect(() => {
    setSwitchOrders(administrativeProfileFromDB?.purchaseOrder);
  }, [])

  useEffect(() => {
    setChecked(administrativeProfile.cguCheck);
  }, [administrativeProfile])

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Détails facturation</Typography>
      <Grid item container direction={'column'} className={classes.container}>
        <Grid item container direction={'row'} alignItems={'center'} className={classes.switch}>
          <CustomSwitch switchSize={'small'}
            name={'administrativeProfile.purchaseOrder'}
            setChecked={setSwitchOrders}
            onBlur={handleBlur}
            onChange={handleChange}
            checked={switchOrders}
            error={!!getIn(touched, 'administrativeProfile.purchaseOrder') && !!getIn(errors, 'administrativeProfile.purchaseOrder')}
          />
          <Typography variant={'body1'}>Des bons de commande sont nécessaires pour la facturation</Typography>
        </Grid>
        <Grid item container direction={'row'} alignItems={'center'} className={classes.charteContainer}>
          <CustomCheckBox style={{ position: 'relative', left: -10 }}
            name={'administrativeProfile.cguCheck'}
            onChange={handleChange}
            checked={checked}
          />
          <Typography variant={'body1'}>J’ai lu et j’accepte la charte acracy</Typography>
          <img src={charte} alt={'charte'} className={classes.chart} />
        </Grid>
        <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
          disabled={administrativeProfile.cguCheck === false}
          handleClick={() => handleSubmit({ purchaseOrder: administrativeProfile.purchaseOrder, cguCheck: administrativeProfile.cguCheck })}
          loading={companyUpdateLoading}
        />
      </Grid>
    </Grid>
  );
};
export default Form5;
