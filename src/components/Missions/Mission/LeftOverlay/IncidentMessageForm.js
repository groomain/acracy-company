import React from 'react';

import CustomTextArea from '../../../Inputs/CustomTextArea';
import CustomButton from '../../../Button';
import styles from './styles';

const IncidentMessageForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, loading, valueOut }) => {
  const classes = styles();
  const { message } = values;

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.w100}
    >
      <CustomTextArea
        id="message"
        name="message"
        onChange={handleChange}
        placeholder="Déclarer son incident ici"
        value={message}
      />
      <CustomButton
        title="Envoyer"
        theme={message.trim().length < 1 ? "disabledFilled" : "filledButton"}
        type="submit" loading={loading}
        disabled={message.trim().length < 1} />
    </form>
  )
}

export default IncidentMessageForm;