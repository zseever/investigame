import { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import GameCard from '../../components/GameCard/GameCard';
import FilterBar from '../../components/FilterBar/FilterBar';


export default function GamesPage() {
  const [games, setGames] = useState([])
  const [filterOptions, setFilterOptions] = useState({platforms:'All', genres:'All', metacritic: 0})

  const consoleOptions = {filter:'platforms', label:'Consoles:', values:['All','PC','Nintendo Switch','Wii','Wii U','iOS','macOS','Android','Playstation 3','Playstation 4','Playstation 5','Xbox One','Xbox 360','Xbox Series S/X'],searchValues:['All',4,7,11,10,3,5,21,16,18,187,1,14,186]}
  const metacriticOptions = {filter:'metacritic', label:'Rating above: ', values:0};
  const genreOptions = {filter: 'genres', label: 'Genre:', values:['All','Action','Adventure','Arcade','Board Games','Card','Casual','Educational','Indie','Family','Fighting','Massively Multiplayer','Platformer','Puzzle','Racing','RPG','Shooter','Simulation','Sports','Strategy',]}

  const gameList = games.map((game,idx) =>
    <GameCard key={idx} game={game} />
  )

  async function getItems() {
    const gamesList = await gamesAPI.getGames(filterOptions);
    setGames(gamesList)
  }

  useEffect(function() {
    getItems()
  }, [])

  return (
    <>
    <h1>Games</h1>
    <div className="filter-bar">
      <FilterBar key='console' options={consoleOptions} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
      <FilterBar key='meta' options={metacriticOptions} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
      <FilterBar key='genre' options={genreOptions} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
      <button onClick={getItems}>Search</button>
    </div>
    <div className="game-card-cont">
      {gameList}
    </div>
    </>
  );
}