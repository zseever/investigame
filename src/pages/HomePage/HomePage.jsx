import { useState, useEffect} from 'react';
import * as gamesAPI from '../../utilities/games-api';
import GameCard from '../../components/GameCard/GameCard';

export default function HomePage() {
    const [games, setGames] = useState(null);

    useEffect(function () {
        if (!games) {
            async function getGames() {
                const featGames = await gamesAPI.getFeaturedGames()
                setGames(featGames)
            }
            getGames();
        }
    },[])
    
    return (
        <>
            <h1>Featured Games</h1>
            <div className="featured-games-cont">
                {games && games.map((game,idx) => <GameCard key={idx} game={game}/>)}
            </div>    
        </>
    )
}