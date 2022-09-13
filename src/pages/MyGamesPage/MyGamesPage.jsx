import { useState, useEffect } from 'react';
import * as usergamesAPI from '../../utilities/usergames-api';

export default function MyGamesPage() {
  const [gameList, setGameList] = useState(null);
  const [editMode, setEditMode] = useState(null)

  async function handleSubmit(idx) {
    await usergamesAPI.updateGame(gameList[idx]);
  }

  async function deleteGame(gameId) {
    const result = await usergamesAPI.deleteGame(gameId);
    if (result === 'deleted') {
      const list = await usergamesAPI.getList();
      setGameList(list);
    }
  }

  function changeInterest(idx, inc) {
    const list = gameList.map(x => x);
    if (list[idx].interest + inc === 6 || list[idx].interest + inc === 0) {
      return
    }
    list[idx].interest += inc
    setGameList(list);
  }

  function changeProgress(idx, evt) {
    const list = gameList.map(x => x);
    list[idx].progress = evt.target.value
    setGameList(list);
  }

  async function changeEditMode(idx) {
    const list = editMode.map(x => x);
    list[idx].edit = !list[idx].edit
    setEditMode(list);
  }

  useEffect(function() {
    async function getUserList() {
      const list = await usergamesAPI.getList();
      setGameList(list);
      const edit = list.map(x => ({'edit':false}))
      setEditMode(edit);
    }
    getUserList();
  },[])

  return (
    <div>
      <h1>My Games</h1>
      {gameList && 
        gameList.map((x,idx) =>
          
        <div key={idx} className={`my-game-row ${x.progress === 'Completed' ? 'completed' : ''}`}>
          <img className='my-game-img' src={x.gameData.background_image} alt={x.gameData.name} />
          <div className='flex-col my-game-data'>
            <a key={idx} href={`/games/${x.gameId}`}>
                <p>{x.gameData.name}</p>
            </a>

            {editMode[idx].edit ? 
              <>
                <div className="interest-cont">
                  <button onClick={() => changeInterest(idx,-1)}>-</button>
                  <p>Interest: {x.interest}</p>
                  <button onClick={() => changeInterest(idx,1)}>+</button>
                </div>
                <p>Progress: 
                  <select onChange={(evt) => changeProgress(idx,evt)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Dropped">Dropped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </p>
                <button onClick={() => {
                  changeEditMode(idx);
                  handleSubmit(idx);
                  }}>Save Changes</button>
              </>
              :
              <>
                <p>Interest: {x.interest}</p>
                <p>Progress: {x.progress}</p>
                <div>
                  <button onClick={() => changeEditMode(idx)}>Edit</button>
                  <button onClick={() => deleteGame(x.gameId)}>Delete</button>
                </div>
              </>

            }
          </div>
        </div>
      )}
    </div>
  );
}