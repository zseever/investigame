import { useState, useEffect } from 'react';
import * as usergamesAPI from '../../utilities/usergames-api';

export default function MyGamesPage() {
  const [userList, setUserList] = useState(null);
  const [gameList, setGameList] = useState(null);

  useEffect(function() {
    async function getUserList() {
      const list = await usergamesAPI.getList();
      setUserList(list);
    }
    getUserList();

  },[])

  return (
    <div>
      <h1>My Games</h1>
      {userList && 
        <>
          <p>{userList.gameList[0].gameId}</p>
          <p>{userList.gameList[0].gameId}</p>
          <p>{userList.gameList[0].gameId}</p>
        </>
      }
    </div>
  );
}