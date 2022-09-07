import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';

export default function GamePage() {
    const [game, setGame] = useState(null)
    let { gameId } = useParams();

    useEffect(function() {
      async function getGame() {
        const gameData = await gamesAPI.getById(gameId);
        setGame(gameData)
      }
      getGame()
    }, [gameId])

    return (
        <div>
            {game && (
                <>
                    <p>{game.name}</p>
                    <img src={game.background_image} alt={game.slug} />
                    <br></br>
                    <p>{game.description_raw}</p>
                    <a href={game.website}>{game.name}'s Website</a>
                    <p>Release Date: {game.released}</p>
                    <p>ESRB Rating: {game.esrb_rating.name}</p>
                    {/* add anchor html elements below for tag searching ?*/}
                    <p>Platforms: {game.platforms.map(x => x.platform.name).join(', ')}</p>
                    <p>Genres: {game.genres.map(x => x.name).join(', ')}</p>
                    <p>Tags: {game.tags.map(x => x.name).join(', ')}</p>
                    <div>
                        <p>Ratings</p>
                        <ul>
                            {game.ratings.map(x => <li>{x.title.charAt(0).toUpperCase()+x.title.slice(1)}: {Math.floor(x.percent)}% ({x.count})</li>)}
                        </ul>
                    </div>
                    <div>
                        <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="reddit-logo" />
                        <p>{game.reddit_name}</p>
                        <p>{game.reddit_description}</p>
                    </div>
                </>
            )}
        </div>
    )
}