import { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import GameCard from '../../components/GameCard/GameCard';


export default function GamesPage() {
  const [games, setGames] = useState([])

  useEffect(function() {
    async function getItems() {
      const gamesList = await gamesAPI.getGames();
      setGames(gamesList)
    }
    getItems()
  }, [])

  const gameList = games.map((game,idx) =>
    <GameCard key={idx} game={game} />
  )
  

  return (
    <>
    <h1>Games</h1>
    <form action="">
      
    </form>
    <div class="game-card-cont">
      {gameList}
    </div>
    </>
  );
}