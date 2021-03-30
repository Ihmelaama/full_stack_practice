import React, { useState, useEffect } from "react";
import axios from "axios";
import DragArea from "./components/dragArea";
import AttackResultsOverlay from "./components/attackResultsOverlay";
import { Card, AttackResults } from "./types";

const App: React.FunctionComponent = () => {
  const [updateKey, setUpdateKey] = useState(0);
  const [playerItems, setPlayerItems] = useState<Array<Card>>([]);
  const [enemyItems, setEnemyItems] = useState<Array<Card>>([]);
  const [attackResults, setAttackResults] = useState<AttackResults | null>(
    null
  );

  useEffect(() => {
    axios.get("http://localhost:3001/hand/new?type=hero").then((res) => {
      if (!res.data.error) setPlayerItems(res.data);
    });

    axios.get("http://localhost:3001/hand/new?type=enemy").then((res) => {
      if (!res.data.error) setEnemyItems(res.data);
    });
  }, []);

  const handleDragDrop = (droppedId: string, dropTargetId: string) => {
    const url = `http://localhost:3001/attack?attacker=${droppedId}&defender=${dropTargetId}`;
    axios.get(url).then((res) => {
      if (!res.data.error) {
        setAttackResults(res.data);
        //setAttackResultsCallback(prkle);
        /*
        let attackMsg = "";
        for (let i = 0; i < data.attackRolls.length; i++) {
          if (attackMsg.length > 0) attackMsg += " + ";
          attackMsg += data.attackRolls[i];
        }

        let defenseMsg = "";
        for (let i = 0; i < data.defenseRolls.length; i++) {
          if (defenseMsg.length > 0) defenseMsg += " + ";
          defenseMsg += data.defenseRolls[i];
        }

        const resultMsg = data.attackSuccess
          ? "Attack successful!"
          : "Attack failed.";

        confirm(`
        Attack rolls: ${attackMsg}\n
        Defense rolls: ${defenseMsg}\n
        ${resultMsg}
        `);

        const updatedCards: Array<Card> = data.updatedCards;
        let newPlayerItems = [...playerItems];
        let newEnemyItems = [...enemyItems];

        for (let i = 0; i < updatedCards.length; i++) {
          const card: Card = updatedCards[i];

          newPlayerItems = newPlayerItems.map((item) =>
            item.id === card.id ? card : item
          );

          newEnemyItems = newEnemyItems.map((item) =>
            item.id === card.id ? card : item
          );
        }

        setPlayerItems(newPlayerItems);
        setEnemyItems(newEnemyItems);

        setUpdateKey(updateKey + 1);
        */
      } else {
        setAttackResults(null);
      }
    });
  };

  return (
    <div>
      <DragArea
        updateKey={updateKey}
        draggableItems={playerItems}
        dropTargets={enemyItems}
        dropCallback={handleDragDrop}
      />
      {attackResults && (
        <AttackResultsOverlay
          attackResults={attackResults}
          confirmCallback={() => {
            setUpdateKey(updateKey + 1);
            setAttackResults(null);
          }}
        ></AttackResultsOverlay>
      )}
    </div>
  );
};

export default App;
