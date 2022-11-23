import { Fragment, useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/app.context';
import { useDispatch } from 'react-redux';
import { searchStory }  from '../../store/story/story.actions';

import { signOutUser } from '../../utils/firebase/firebase';
import './navigation.styles.scss';

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()
  const { currentUser } = useContext(UserContext);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchStory(searchTerm))
    }
  }

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
            <li>
                <Link className='nav-link' to='/queue'>
                  Ilarakoak
                </Link>
            </li>
          {currentUser ? (
            <>
              <li onClick={signOutUser}>
                Irten
              </li>
              <li>
                <Link to={`/user/${currentUser.displayName}`}>{currentUser.displayName}</Link>
              </li>
            </>

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
            <div>
              <label htmlFor="search" accessKey="100" className="inside">bilatu</label>
              <input name="search" id="search" type="text" onChange={handleChange} onKeyDown={handleSearch}/>
            </div>
          </li>
          </ul>
        </div>
        <div id="nav-string">
          <div>» <Link to='/'><strong>www.zabaldu.com</strong></Link></div>
        </div>
        <div className="banner-01">
          <div className="banner-01-c">
          </div>
        </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;