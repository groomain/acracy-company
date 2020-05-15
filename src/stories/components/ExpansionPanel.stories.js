import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import { Typography } from '@material-ui/core';

import CustomExpansionPanel from "../../components/CustomExpansionPanel";

export default {
  title: 'Components|Expansion Panel',
  component: CustomExpansionPanel
};

const styles = {
  padding: '3rem'
};

export const withArrowIcon = () => (
  ProviderWrapper(
    <div style={styles}>
      <CustomExpansionPanel
        isTag={false}
        panelTitle="Contexte de la mission et tâches à réaliser"
      >
        <Typography>
          Certe, inquam, pertinax non recusandae itaque aiunt hanc quasi naturalem atque corrupti, quos. In oculis quidem exercitus quid ex eo delectu rerum, quem modo ista sis. Epicurus in animis nostris inesse notionem, ut ipsi auctori huius disciplinae placet: constituam. Primum igitur, quid et dolorem? sunt autem quidam e nostris,
          qui in ea.Certe, inquam, pertinax non recusandae itaque aiunt hanc quasi naturalem atque corrupti, quos. In oculis quidem exercitus quid ex eo delectu rerum, quem modo ista sis. Epicurus in animis nostris inesse notionem, ut ipsi auctori huius disciplinae placet: constituam. Primum igitur, quid et dolorem? sunt autem quidam e nostris,
          qui in ea.
        </Typography>
      </CustomExpansionPanel>
    </div>
  )
);

export const withPlusIcon = () => (
  ProviderWrapper(
    <div style={styles}>
      <CustomExpansionPanel
        isTag
        panelTitle="Contexte de la mission et tâches à réaliser"
      >
        <Typography>
          Sed ut labore et molestiae consequatur, vel eum fugiat, quo pertineant non fuisse torquem detraxit hosti et quidem faciunt, ut et accurate disserendum et dolorem? sunt autem quidam e nostris, qui studiose antiqua persequeris, claris et fortibus viris commemorandis.
          - Sed ut ipsi auctori huius disciplinae placet: constituam, quid est et benivole collegisti, nec in liberos atque
        </Typography>
      </CustomExpansionPanel>
    </div>
  )
);

