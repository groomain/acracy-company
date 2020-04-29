import React from 'react';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import styles from './styles';

// export const CustomTextField = ({ label, placeholder, type, error, helperText, ...props }) => {
//     const classes = styles();
//     return (
//         <Box style={{ height: '140px' }}>
//             <InputLabel className={classes.label} error={error}>{label}*</InputLabel >
//             <FilledInput
//                 type={type}
//                 placeholder={placeholder}
//                 fullWidth
//                 error={error}
//                 classes={{ root: classes.root, focused: classes.focused }}
//                 disableUnderline
//                 {...props}
//             />
//             <FormHelperText error={error}>{helperText}</FormHelperText>
//         </Box >
//     );
// };

export const CustomTextArea = ({ label, placeholder, error, helperText, ...props
}) => {
    const classes = styles();
    const [values, setValues] = React.useState({
        missionDescription: '',
    });

    const handleChange = prop => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // https://codesandbox.io/s/l2l2v

    return (
        <Box>
            <InputLabel error={error} className={classes.label}>{label}*</InputLabel>
            <TextField
                classes={{ root: classes.root, placeholder: classes.placeholder }}
                placeholder={placeholder}
                rowsMin="3"
                rowsMax="7"
                value={values.missionDescription}
                onChange={handleChange('value')}
                error={error}
                {...props}
            />
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </Box>
    );

};

export default CustomTextArea;
