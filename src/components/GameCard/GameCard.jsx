export default function GameCard({ game }) {
    return (
        <>
        <a href={`/games/${game.id}`}>
            <div className="game-card" style={{backgroundImage: `url(${game.background_image})`}}>
                {/* <img className="game-card-img" src={game.background_image} alt={game.slug} /> */}
                <div className="flex-row title-cont">
                    <p className="game-card-text">{game.name}</p>
                </div>
            </div>
        </a>
        </>
    )
}