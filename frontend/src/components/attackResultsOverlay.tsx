import React from "react";
import { AttackResults, Card } from "../types";
import "./overlay.scss";

const AttackResultsOverlay = ({
  attackResults,
  confirmCallback,
}: {
  attackResults: AttackResults;
  confirmCallback?: () => void;
}) => {
  const attackSuccess: boolean = attackResults.attackSuccess;
  const attacker: Card = attackResults.attackerCard;
  const defender: Card = attackResults.defenderCard;
  const attackTotal: number = attackResults.attackRolls.reduce(
    (a, b) => a + b,
    0
  );
  const defenseTotal: number = attackResults.defenseRolls.reduce(
    (a, b) => a + b,
    0
  );

  const calculateAttack = (): string => {
    if (attackResults.attackRolls.length == 1) return "" + attackTotal;
    const rolls = attackResults.attackRolls.join(" + ");
    return rolls + " = " + attackTotal;
  };

  const calculateDefense = (): string => {
    if (attackResults.defenseRolls.length == 1) return "" + defenseTotal;
    const rolls = attackResults.defenseRolls.join(" + ");
    return rolls + " = " + defenseTotal;
  };

  const getRandomItemFromArray = (arr: Array<string>): string => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomButtonText = () => {
    if (attackResults.attackSuccess) {
      return getRandomItemFromArray([
        "Nice!",
        "Sweet!",
        "Awesome!",
        "Oh snap!",
        "Boom!",
      ]);
    } else {
      return getRandomItemFromArray([
        "Nuts.",
        "Dang.",
        "Aw man.",
        "Disappointed.",
      ]);
    }
  };

  return (
    <React.Fragment>
      {attackResults && (
        <div className="overlay">
          <div>
            <span>
              <h1>
                {attacker.name} attacks {defender.name}
              </h1>
              <span>
                {attacker.name} attack rolls: {calculateAttack()}
              </span>
              <span>
                {defender.name} defense rolls: {calculateDefense()}
              </span>
              {attackSuccess && <h2>{attacker.name} won!</h2>}
              {!attackSuccess && (
                <h2>
                  {attackTotal == defenseTotal
                    ? "Stalemate."
                    : attacker.name + " lost."}
                </h2>
              )}
            </span>
            <input
              type="button"
              value={getRandomButtonText()}
              onClick={() => {
                if (confirmCallback) confirmCallback();
              }}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AttackResultsOverlay;
