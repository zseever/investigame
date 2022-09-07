import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, randomGame }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link className="site-name" to='/'>InvestiGame</Link>
      <Link to={`/games/${randomGame.id}`}>Random Game</Link>
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