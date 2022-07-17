import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/app.context';

import { signOutUser } from '../../utils/firebase/firebase';
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
        <div id='logo'>
          <Link to='/'>
              <img src="https://raw.githubusercontent.com/pxai/zabaldu-backend/master/zabaldu.png" />
          </Link>
        </div>
        <div id='header'>
          <ul>
            <li><a href="./">Laguntza</a></li>
            <li>
              <Link className='nav-link' to='/send'>
                Bidali berria
              </Link>
            </li>
          {currentUser ? (
            <li onClick={signOutUser}>
              Irten
            </li>
          ) : (
            <>
              <li>
                <Link className='nav-link' to='/auth'>
                  Erregistratu
                </Link>
              </li>
              <li>
                <Link className='nav-link' to='/auth'>
                  Saioa hasi
                </Link>
              </li>
            </>

          )}
          <li>
            <form action="./" method="get" name="thisform" id="thisform-search">
              <label for="search" accesskey="100" class="inside">bilatu</label>
              <input name="search" id="search" value="bilatu..." type="text" onblur="if(this.value=='') this.value='bilatu...';" onfocus="if(this.value=='bilatu...') this.value='';" />
            </form>
          </li>
          </ul>
        </div>
        <div id="nav-string">
          <div>» <Link to='/'><strong>www.zabaldu.com</strong></Link></div>
        </div>
        <div class="banner-01">
          <div class="banner-01-c">
          </div>
        </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;