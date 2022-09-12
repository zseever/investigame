import { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import GameCard from '../../components/GameCard/GameCard';
import FilterBar from '../../components/FilterBar/FilterBar';


export default function GamesPage() {
  const [games, setGames] = useState([])
  const [filterOptions, setFilterOptions] = useState({'console':'All', rating:'All', genre:'All'})

  const consoleOptions = {filter:'console', label:'Consoles', values:['All','PC','Nintendo Switch','Wii','iOS','macOS','Android','Playstation 3','Playstation 4','Playstation 5','Xbox One','Xbox 360','Xbox Series S/X']}
  const ratingOptions = {filter: 'rating', label:'Rating', values:['All','Skip','Meh','Recommended','Exceptional']}
  const genreOptions = {filter: 'genre', label: 'Genre', values:['All','Action','Adventure','Arcade','Board Games','Card','Casual','Educational','Indie','Family','Fighting','Massively Multiplayer','Platformer','Puzzle','Racing','RPG','Shooter','Simulation','Sports','Strategy',]}

  const gameList = games.map((game,idx) =>
    <GameCard key={idx} game={game} />
  )

  useEffect(function() {
    async function getItems() {
      const gamesList = await gamesAPI.getGames();
      setGames(gamesList)
    }
    getItems()
  }, [])

  return (
    <>
    <h1>Games</h1>
    <div className="filter-bar">
      <FilterBar options={consoleOptions}/>
      <FilterBar options={ratingOptions}/>
      <FilterBar options={genreOptions}/>
      <button>Search</button>
    </div>
    <div className="game-card-cont">
      {gameList}
    </div>
    </>
  );
}