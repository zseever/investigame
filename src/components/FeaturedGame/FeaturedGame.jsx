export default function FeaturedGame({ game }) {
    return (
        <div>
            <p>{game.title}</p>
            <img src={game.img} alt={game.title} />
            <p>Release Date: {game.releaseDate}</p>
        </div>
    )
}