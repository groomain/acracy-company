import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import DarkWrapper from '../../Layout/DarkWrapper';
import fileIcon from '../../../assets/icons/file-icon.svg';
import uploadFileIcon from '../../../assets/icons/upload-file.svg';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { Grid, Typography, Box, IconButton } from '@material-ui/core';
import styles from './styles';
import {uploadFileLaunched, deleteAttachmentLaunched, getAttachmentsLaunched} from "./reducer";
import {checkMissingFilesForm, changeAttachmentFromData} from "../../../pages/AdministrativePage/reducer";

const UploadInput = (props) => {
    const classes = styles();

    return (
        <div className={classes.uploadContainer}>
            <img src={uploadFileIcon} alt="upload button" />
            <input
                type="file"
                name="img-loader-input"
                // multiple
                className={classes.invisible}
                {...props}
            />
        </div >
    )
}

const getName = (name) => {
    switch (name) {
        case 'kbis':
            return 'Kbis';
        case 'status':
            return 'Status';
        case 'cin1':
            return 'Carte d\'identité 1';
        case 'cin2':
            return 'Carte d\'identité 2';
        case 'cin3':
            return 'Carte d\'identité 3';
        case 'cin4':
            return 'Carte d\'identité 4';
    }
};

export const Upload = (props) => {
    const classes = styles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { leadAttachmentId, leadDraftId, companyData} = useSelector(state => ({
        leadAttachmentId: state.getIn(['leadCreation', 'leadAttachmentId']),
        leadDraftId: state.getIn(['leadCreation', 'leadDraftId']),
        companyData: state.getIn(['Administrative', 'companyData']),
    }));

    const [uploadedFiles, setUploadedFiles] = useState(props.name && companyData?.administrativeProfile?.legalDocuments?.filter((file) => file.name === companyData.externalId + '-' + props.name).length !== 0
        ? [{file: companyData?.administrativeProfile?.legalDocuments?.filter((file) => file.name === companyData.externalId + '-' + props.name)[0]}] : []);
    const [fileSizeError, setFileSizeError] = useState(false);
    const [hoveredClose, setHoveredClose] = React.useState(false);
    const [hoveredGet, setHoveredGet] = React.useState(false);

    const handleChange = (e) => {
        const fileList = e.target.files;
        const arrFiles = Array.from(fileList)

        if (fileList.length) {
            const files = arrFiles.map((file, index) => {
                const src = window.URL.createObjectURL(file)
                return { file, id: index, src, leadId: leadDraftId }
            });
            setUploadedFiles(files);
            if (props.name){
                props.setName(props.name);
                dispatch(uploadFileLaunched({files: files, type: props.type, name: props.name, companyData: companyData}))
            } else {
                props.setName(files[0].file.name);
                dispatch(uploadFileLaunched({files: files, type: props.type}))
            }
        }

        if (fileList[0].size > 1.5e+7) {
            setFileSizeError(true)
        }
    };

    useEffect(() => {
        if (companyData?.administrativeProfile?.legalDocuments?.filter((file) => file.name === companyData.externalId + '-kbis' || file.name === companyData.externalId + '-cin1' || file.name === companyData.externalId + '-status').length === 3) {
            dispatch(checkMissingFilesForm(false))
        } else {
            dispatch(checkMissingFilesForm(true))

        }
    }, [companyData]);

    const handleFileDelete = () => {
        setUploadedFiles([]);
        dispatch(deleteAttachmentLaunched(leadAttachmentId))
    };

    const handleFileDeleteFromData = (id) => {
        setUploadedFiles([]);
        dispatch(deleteAttachmentLaunched(id));
        const newLegalDocuments = companyData?.administrativeProfile?.legalDocuments?.filter((file) => file?.name !== companyData.externalId + '-' + props.name);
        const newCompanyData = {...companyData, administrativeProfile: {...companyData.administrativeProfile, legalDocuments: newLegalDocuments}};
        dispatch(changeAttachmentFromData(newCompanyData))
    };

    return (
        <>
            {
                props.withOutText ?
                    <form className="form">
                        <Grid container>
                            {uploadedFiles?.map(({ file, src, id }, index) => {
                                return (
                                    <Box mx={2} key={`file-row${index}`}>
                                        <Grid container direction="column" alignItems="center">
                                            <div style={{ position: 'relative' }}>
                                                <img src={fileIcon} alt="uploaded file" onClick={() => dispatch(getAttachmentsLaunched(file.externalId))} className={classes.img}/>
                                                <CloseIcon
                                                    hovered={hoveredClose}
                                                    onMouseEnter={() => setHoveredClose(true)}
                                                    onMouseLeave={() => setHoveredClose(false)}
                                                    className={classes.closeButton}
                                                    onClick={() => handleFileDeleteFromData(file.externalId)}
                                                />
                                            </div>
                                            <Box my={1}>
                                                <Typography className={fileSizeError ? classes.maxedFileSize : null}>{props.placeHolder}</Typography>
                                            </Box>
                                        </Grid>
                                    </Box>
                                )
                            })}
                            {uploadedFiles?.length < 1 && (
                                <Grid container direction="column" alignItems="center" className={classes.uploadIconWrapper}>
                                    <UploadInput onChange={(e) => handleChange(e)} />
                                    {props.placeHolder ?
                                        <Box my={1}>
                                            Ajouter un(e) {props.placeHolder}
                                        </Box>
                                        :
                                        <Box my={1}>
                                            {t('upload.addDocument')}
                                        </Box>
                                    }

                                </Grid>
                            )}
                        </Grid>
                    </form>
                    :
                    <>
                        <Box my={3}>
                            <Typography variant="h1">{t('upload.title.single')}</Typography>
                        </Box>
                        <Box my={2}>
                            <Typography variant="body1">{t('upload.subtitle')}</Typography>
                        </Box>
                        <DarkWrapper justify='center' alignItems='center'>
                            <form className="form">
                                <Grid container>
                                    {uploadedFiles?.map(({ file, src, id }, index) => {
                                        return (
                                            <Box mx={2} key={`file-row${index}`}>
                                                <Grid container direction="column" alignItems="center">
                                                    <div style={{ position: 'relative' }}>
                                                        <img src={fileIcon} alt="uploaded file" />
                                                        <IconButton
                                                            onClick={handleFileDelete}
                                                            disableRipple
                                                            className={classes.closeButton}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </div>
                                                    <Box my={1}>
                                                        <Typography className={fileSizeError ? classes.maxedFileSize : null}>{file.name}</Typography>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                        )
                                    })}
                                    {uploadedFiles?.length < 1 && (
                                        <Grid container direction="column" alignItems="center" className={classes.uploadIconWrapper}>
                                            <UploadInput onChange={(e) => handleChange(e)} />
                                            <Box my={1}>
                                                {t('upload.addDocument')}
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </form>
                        </DarkWrapper>
                        <Box my={2}>
                            <Typography variant="body1" color="primary">{t('upload.confidentialityText')}</Typography>
                        </Box>
                    </>
            }
        </>
    )
};

export default Upload;
