import React from 'react';
import Logo from '../../components/Logo';
import Styles from './RecoverPasswordPage.module.sass';
import CONSTANTS from '../../constants';
import { Link } from 'react-router-dom';
import RecoverForm from './components/RecoverForm';

const RecoverPasswordPage = (props) => {
  const token = props.location.search.split('=')[1];
  
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.recoverContainer}>
        <div className={Styles.headerloginPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          <div className={Styles.linkLoginContainer}>
            <Link
              to="/login"
              style={{ textDecoration: 'none' }}
            >
              <span>Login</span>
            </Link>
          </div>
        </div>
        <div className={Styles.loginFormContainer}>
          <RecoverForm token = {token} history={props.history} />
        </div>
      </div>
    </div>
  );}

  export default RecoverPasswordPage;