import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { logoutLaunched } from '../../components/App/reducer';
import Grid from '../SignIn';
import CustomButton from '../../components/Button';
import useApi from '../../utils/useApi';

export const HomePage = (props) => {

  const {
    loading, data, error, refetch
  } = useApi('/ideas', 'Get');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const logout = () => {
    dispatch(logoutLaunched());
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error...</p>
      </div>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography>{t('homePageTitle')}</Typography>
      {/* {data.results.map((item, key) => (
        <ul key={key}>
          <li>{item.title}</li>
        </ul>
      ))} */}
      <CustomButton onClick={() => refetch()} title={t('refresh')} />
      <CustomButton onClick={logout} title={t('logoutButton')} />
    </Grid>
  );
};

export default HomePage;
