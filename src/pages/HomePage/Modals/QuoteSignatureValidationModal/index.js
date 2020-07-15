import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    Dialog, Typography, IconButton, Grid
} from '@material-ui/core/';
import styles from '../styles';
import CustomModal from '../../../../components/Modal';

export const QuoteSignatureValidationModal = ({ open, handleClose, ...props }) => {

    const {companiesData} = useSelector(state => ({
        companiesData: state.getIn(['dashboard', 'companiesData'])
    }));

    const email = companiesData?.administrativeProfile?.billing?.email;

    return (
        <CustomModal
            open={open}
            handleClose={handleClose}
            title="Validation du devis"
        >
            <Typography>
                Vous avez reçu le devis par mail à l'adresse <span style={{ color: '#ecf805' }}>{email}</span>, il vous suffit de le signer électroniquement pour accéder aux
                coordonnées de votre freelance.
            </Typography>
        </CustomModal>
    );
};

export default QuoteSignatureValidationModal;
