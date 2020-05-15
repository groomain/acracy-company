import React from "react";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from './styles';

export const CustomSwitch = ({ checked, setChecked, switchSize, ...props }) => {
    const classes = styles();
    // const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };

    return (
        <FormGroup {...props}>
            <FormControlLabel
                control={<Switch
                    classes={{
                        root: classes[`${switchSize}Root`],
                        switchBase: classes[`${switchSize}SwitchBase`],
                        thumb: classes[`${switchSize}Thumb`],
                        track: classes[`${switchSize}Track`],
                        checked: classes[`checked`]
                    }}
                    checked={checked}
                    onChange={toggleChecked}
                />}
            />
        </FormGroup>
    );
}

export default CustomSwitch;
