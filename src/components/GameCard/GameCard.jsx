export default function GameCard({ game }) {
    return (
        <>
        <a href={`/games/${game.id}`}>
            <div className="game-card">
                <p>{game.name}</p>
                <img src={game.background_image} alt={game.slug} />
            </div>
        </a>
        </>
    )
}