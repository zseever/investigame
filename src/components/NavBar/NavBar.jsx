import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const [randomGame, setRandomGame] = useState(null)

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to='/'>InvestiGame</Link>
      &nbsp; | &nbsp;
      <Link to={`/games/${randomGame}`}>Random Game</Link>
      &nbsp; | &nbsp;
      <Link to='/games'>Games</Link>
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