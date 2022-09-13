import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import logo from '../../assets/logo.png';

export default function NavBar({ user, setUser, randomGame }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="site-name flex-row">
        <Link className="site-name" to='/'>InvestiGame</Link>
        <img className="nav-logo" src={logo} alt="logo" />
      </div>
      <Link to={`/games/${randomGame}`}>Random Game</Link>
      &nbsp; | &nbsp;
      <Link to='/games'>All Games</Link>
      &nbsp; | &nbsp;
      { user ?
      <>
        <Link to='/library'>My Games</Link>
        &nbsp; | &nbsp;
        <Link to='' onClick={handleLogOut}>Log Out</Link> 
        &nbsp; | &nbsp;
        <span>Welcome, {user.name}</span>
      </>
      :
      <Link to='/auth'>Sign In/Up</Link>
      }
    </nav>
  );
}