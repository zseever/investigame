import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';

export default function GamePage() {
    const [game, setGame] = useState()
    let { gameId } = useParams();

    useEffect(function() {
      async function getGame() {
        const gameData = await gamesAPI.getById(gameId);
        setGame(gameData)
      }
      getGame()
    }, [])

    return (
        <div>
            <p>Test</p>
            <p>{game.name}</p>
            <img src={game.background_image} alt={game.slug} />
            <p>Release Date: {game.released}</p>
        </div>
    )
}