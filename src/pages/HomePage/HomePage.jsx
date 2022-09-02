import FeaturedGame from '../../components/FeaturedGame/FeaturedGame';

export default function HomePage() {
    const tempGame = {title:'Donkey Kong', img:'https://i.imgur.com/TCGLRi6.png', releaseDate: '7-7-2010',}
    
    return (
        <>
            <h1>Featured Games</h1>
            <div>
                <FeaturedGame game={tempGame}/>
                <FeaturedGame game={tempGame}/>
                <FeaturedGame game={tempGame}/>
                <FeaturedGame game={tempGame}/>
            </div>    
        </>
    )
}