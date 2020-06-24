import React from 'react';
// import { useDispatch } from 'react-redux';
// import { logoutLaunched } from '../../components/App/reducer';
import MyAccount from '../MyAccount';

export const HomePage = (props) => {

  ///////// Keep for future reference

  // const dispatch = useDispatch();
  // const { loading, data, error, refetch } = useApi('/ideas', 'Get');

  // const logout = () => {
  //   dispatch(logoutLaunched());
  // };

  return <MyAccount />
};

export default HomePage;
