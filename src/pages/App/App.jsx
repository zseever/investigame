import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as gamesAPI from '../../utilities/games-api';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import GamesPage from '../GamesPage/GamesPage';
import GamePage from '../GamePage/GamePage';
import MyGamesPage from '../MyGamesPage/MyGamesPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [randomGame, setRandomGame] = useState('3498')

  useEffect(function() {
    async function randomGame() {
      const game = await gamesAPI.getRandomGame();
      setRandomGame(game.id);
    }
    randomGame();
  }, [])

  return (
    <main className="App">
        <>
          <NavBar user={user} setUser={setUser} randomGame={randomGame} />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/games' element={<GamesPage />} />
            <Route path='/games/:gameId' element={<GamePage user={user} />} />
            <Route path='/library' element={<MyGamesPage />} />
            <Route path='/auth' element={<AuthPage setUser={setUser}/>} />
          </Routes>
        </>
    </main>
  );
}
