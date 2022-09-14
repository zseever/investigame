import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import * as usergamesAPI from '../../utilities/usergames-api';

export default function GamePage({ user }) {
    const [game, setGame] = useState(null)
    const [userGame, setUserGame] = useState(false);
    const [display, setDisplay] = useState('desc');
    const [trailers, setTrailers] = useState([]);
    const [trailer, setTrailer] = useState('')
    let { gameId } = useParams();

    async function handleAddToList(gameId) {
        await usergamesAPI.addGameToList(gameId);
        setUserGame(true);
    }


    useEffect(function() {
      async function getGame() {
        const gameData = await gamesAPI.getById(gameId);
        const game = gameData.game;
        const trailers = gameData.trailers;
        setGame(game);
        if (trailers.length > 0) {
            setTrailers(trailers);
            setTrailer(trailers[0].data.max);
        }
      }
      getGame()
      async function checkGame() {
        const gameExists = await usergamesAPI.gameCheck(gameId);
        console.log(gameExists);
        setUserGame(gameExists);
      }
      checkGame()
    }, [gameId])

    return (
        <div>
            {game && (
                <>
                    <div className="show-title-cont">
                        <p className="game-title">{game.name}</p>
                        {(!userGame && user) &&
                            <button onClick={() => handleAddToList(game.id)} type="submit">Add to My Games</button>
                        }
                    </div>
                    <div className="flex-row">
                        <img className="show-img" src={game.background_image} alt={game.slug} />
                        <div className="flex-col">
                            <div className="show-buttons">
                                <button onClick={(evt) => setDisplay(evt.target.value)} value="desc">Description</button>
                                <button onClick={(evt) => setDisplay(evt.target.value)} value="genre">Genres & Platforms</button>
                                {trailers.length > 0 && <button onClick={(evt) => setDisplay(evt.target.value)} value="trailer">Trailer</button>}
                                <button onClick={(evt) => setDisplay(evt.target.value)} value="ratings">Ratings</button>
                                {game.reddit_name && <button onClick={(evt) => setDisplay(evt.target.value)} value="reddit">Reddit</button>}
                            </div>
                            <div className="flex-col game-details">
                                {display === 'desc' ?
                                    <>
                                        <p>{game.description_raw}</p>
                                        <a className="game-website" href={game.website} target="_blank" rel="noreferrer">{game.name}'s Website</a>
                                        <p>Release Date: {game.released}</p>
                                        {game.esrb_rating && <p>ESRB Rating: {game.esrb_rating.name}</p>}
                                    </>
                                    :
                                    display === 'genre' ?
                                    <>
                                        {/* add anchor html elements below for tag searching ?*/}
                                        {game.platforms && <p>Platforms: {game.platforms.map(x => x.platform.name).join(', ')}</p>}
                                        {game.genres && <p>Genres: {game.genres.map(x => x.name).join(', ')}</p>}
                                        {game.tags && <p>Tags: {game.tags.map(x => x.name).join(', ')}</p>}
                                    </>
                                    :
                                    display === 'trailer' ?
                                    <>
                                        {<iframe title='trailer' src={trailer}></iframe>}
                                        <div className="flex-row preview-cont">
                                            {trailers.map(x => 
                                                    <button className="trailer-btn" onClick={(evt) => setTrailer(evt.target.value)}
                                                    value={x.data.max}>{x.name}</button>
                                            )}
                                        </div>
                                    </>
                                    :
                                    display === 'ratings' ?
                                    <>
                                        <ul className="ratings-ul">
                                            {game.ratings.map((x,idx) => <li key={idx}>{x.title.charAt(0).toUpperCase()+x.title.slice(1)}: {Math.floor(x.percent)}% ({x.count})</li>)}
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <div className="flex-col">
                                            <img className="reddit-logo" src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="reddit-logo" />
                                            <a className="reddit-website" href={game.reddit_url}>{game.reddit_name}</a>
                                            <p>{game.reddit_description}</p>
                                        </div>
                                    </>

                                }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}