export default function GamePage({ game }) {
    return (
        <div>
            <p>{game.name}</p>
            <img src={game.background_image} alt={game.slug} />
            <p>Release Date: {game.released}</p>
        </div>
    )
}