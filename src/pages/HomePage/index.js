import React from 'react';
// import { useDispatch } from 'react-redux';
// import { logoutLaunched } from '../../components/App/reducer';
import Dashboard from './dashboard';

export const HomePage = (props) => {

  ///////// Keep for future reference

  // const dispatch = useDispatch();
  // const { loading, data, error, refetch } = useApi('/ideas', 'Get');

  // const logout = () => {
  //   dispatch(logoutLaunched());
  // };

  return <Dashboard />
};

export default HomePage;
