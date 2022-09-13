export default function GameCard({ game }) {
    return (
        <>
        <a href={`/games/${game.id}`}>
            <div className="game-card" style={{backgroundImage: `url(${game.background_image})`}}>
                <div className="flex-row title-cont">
                    <p className="game-card-text">{game.name}</p>
                </div>
            </div>
        </a>
        </>
    )
}