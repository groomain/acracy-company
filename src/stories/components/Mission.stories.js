import React from 'react';
import ProviderWrapper from '../../utils/Provider';
import Mission from "../../components/Missions/Mission";

import { missions } from '../../mocks/missions';

export default {
  title: 'Components|Mission',
  component: Mission,
  parameters: {
    backgrounds: [
      { name: 'colored-theme', value: '#162217', default: true }
    ]
  },
};

const singleMission = missions[0];

export const withLogin = () => (
  ProviderWrapper(
    <Mission mission={singleMission} />
  )
);
