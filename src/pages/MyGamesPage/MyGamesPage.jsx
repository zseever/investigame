import { useState, useEffect } from 'react';
import * as usergamesAPI from '../../utilities/usergames-api';

export default function MyGamesPage() {
  const [userList, setUserList] = useState({id: null,gameList:[]});
  const [gameList, setGameList] = useState(null);

  useEffect(function() {
    async function getUserList() {
      const list = await usergamesAPI.getList();
      console.log(list);
      setGameList(list);
    }
    getUserList();
  },[])

  return (
    <div>
      <h1>My Games</h1>
      {/* <p>{gameList[0].gameData.name}</p> */}
      {/* {gameList && 
        gameList.map(x => <p>{x.gameId}</p>)
      } */}
    </div>
  );
}