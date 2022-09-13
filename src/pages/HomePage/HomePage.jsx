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
    },[games])
    
    return (
        <>  
            <div>
                <h1>Find your next journey.</h1>
                <img src="https://i.imgur.com/l1aO3Yr.png" alt="car" />
                <img src="https://i.imgur.com/tiCXgW3.png" alt="woods" />
                <img src="https://i.imgur.com/yDQFpoV.png" alt="space" />
                <img src="https://i.imgur.com/oKciuW0.png" alt="space" />
                <img src="https://i.imgur.com/iirJWaO.png" alt="space" />
                <br></br>
                <img src="https://i.imgur.com/dUdFe37.png" alt="car" />
                <img src="https://i.imgur.com/hjDyQtm.png" alt="space" />
                <img src="https://i.redd.it/3t8imdo801071.jpg" alt="space" />
                <img src="https://i.imgur.com/mR59fXU.png" alt="woods" />
                <img src="https://i.imgur.com/C2ODj5V.png" alt="space" />
            </div>
            <h1>Featured Games</h1>
            <div className="featured-games-cont">
                {games && games.map((game,idx) => <GameCard key={idx} game={game}/>)}
            </div>    
        </>
    )
}