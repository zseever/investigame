import { useState, useEffect } from 'react';
import * as usergamesAPI from '../../utilities/usergames-api';

export default function MyGamesPage() {
  const [gameList, setGameList] = useState(null);
  const [editMode, setEditMode] = useState(null)

  function handleSubmit(evt) {

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
          <div key={idx} className="my-game-row">
            <a key={idx} href={`/games/${x.gameId}`}><p>{x.gameData.name}</p></a>

            {editMode[idx].edit ? 
              <>
                <div className="interest-cont">
                  <button>-</button>
                  <p>Interest: {x.interest}</p>
                  <button>+</button>
                </div>
                <p>Progress: 
                  <select>
                    <option value={x.progress}>{x.progress}</option>
                    <option value="Dropped">Dropped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </p>
                <button onClick={() => {
                  changeEditMode(idx);
                  handleSubmit();
                  }}>Save Changes</button>
              </>
              :
              <>
                <p>Interest: {x.interest}</p>
                <p>Progress: {x.progress}</p>
                <div>
                  <button onClick={() => changeEditMode(idx)}>Edit</button>
                  <button>Delete</button>
                </div>
              </>
            
            }

          </div>
      )}
    </div>
  );
}