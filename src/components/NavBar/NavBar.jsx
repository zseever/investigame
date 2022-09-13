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
      <div className="nav-div">
        <button>
          <Link className='nav-link' to={`/games/${randomGame}`}>RANDOM GAME</Link>
        </button>
        <button>
          <Link className='nav-link' to='/games'>ALL GAMES</Link>
        </button>
        { user ?
        <>
          <button>
            <Link className='nav-link' to='/library'>MY GAMES</Link>
          </button>
          <button>
            <Link className='nav-link' to='' onClick={handleLogOut}>LOG OUT</Link> 
          </button>
          <div className="flex-col">
            <span>Welcome,</span>
            <span>{user.name}</span>
          </div>
        </>
        :
        <button>
          <Link className='nav-link' to='/auth'>LOGIN</Link>
        </button>
        }
      </div>
    </nav>
  );
}