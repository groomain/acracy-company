import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styles from "../styles";
import CustomButton from "../../Button";
import Typography from "@material-ui/core/Typography";
import CustomSwitch from "../../Switch";
import Grid from "@material-ui/core/Grid";
import charte from "../../../assets/icons/charte.svg";
import CustomCheckBox from "../../CheckBox";
// import CustomCheckbox from "../../Forms/SignUpForm";
import { checkMissingInfosForm5 } from '../../../pages/AdministrativePage/reducer';

export const Form5 = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = styles();
  const [switchOrders, setSwitchOrders] = useState(false);
  const [checked, setChecked] = useState(false);

  const { purchaseOrder, chart } = values;

  const handleCheck = () => {
    if (checked === true) {
      setChecked(false)
    } else {
      setChecked(true)
    }
    return checked
  }

  useEffect(() => {
    if (checked === true) {
      dispatch(checkMissingInfosForm5(true))
    }
  }, [checked]);

  return (
    <Grid item container direction={'column'} className={classes.card}>
      <Typography variant={'h2'} className={classes.cardTitle}>Détails facturation</Typography>
      <Grid item container direction={'column'} className={classes.container}>
        <Grid item container direction={'row'} alignItems={'center'} className={classes.switch}>
          <CustomSwitch switchSize={'small'}
            name={'purchaseOrder'}
            setChecked={setSwitchOrders}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.purchaseOrder && !!errors.purchaseOrder}
          />
          <Typography variant={'body1'}>Des bons de commande sont nécessaires pour la facturation</Typography>
        </Grid>
        <Grid item container direction={'row'} alignItems={'center'} className={classes.charteContainer}>
          <CustomCheckBox style={{ position: 'relative', left: -10 }}
            name={'chart'}
            onChange={handleChange}
          // checked={handleCheck}
          />
          <Typography variant={'body1'}>J’ai lu et j’accepte la charte acracy</Typography>
          <img src={charte} alt={'charte'} className={classes.chart} />
        </Grid>
        <CustomButton title={'Sauvegarder'} theme={'filledButton'} className={classes.saveButton}
          disabled={chart === false}
          handleClick={() => handleSubmit({ purchaseOrder, chart })} />
      </Grid>
    </Grid>
  );
};
export default Form5;
