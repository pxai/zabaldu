import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/app.context';

import { signOutUser } from '../../utils/firebase/firebase';
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
            <img src="https://raw.githubusercontent.com/pxai/zabaldu-backend/master/zabaldu.png" />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/send'>
            Bidali berria
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;