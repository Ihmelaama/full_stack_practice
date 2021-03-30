const express = require("express");
const router = express.Router();
const fs = require("fs");

let rawdata = fs.readFileSync("cards.json");
let cards = JSON.parse(rawdata);
let allCards = [...cards.heroes, ...cards.enemies];

router.get("/hand", (req, res) => {
  const type = req.query.type;
  res.send("player current hand");
});

router.get("/hand/new", (req, res) => {
  const type = req.query.type;
  if (type === "hero") {
    res.send(cards.heroes);
  } else if (type === "enemy") {
    res.send(cards.enemies);
  } else {
    res.send({ error: "missing type" });
  }
});

router.get("/attack", (req, res) => {
  const attacker = req.query.attacker;
  const defender = req.query.defender;
  if (attacker && defender) {
    const attackerCard = { ...allCards.find((card) => card.id === attacker) };
    const defenderCard = { ...allCards.find((card) => card.id === defender) };

    const attackRolls = [];
    for (let i = 0; i < attackerCard.attack; i++) {
      attackRolls[i] = 1 + Math.floor(Math.random() * 6);
    }

    const defenseRolls = [];
    for (let i = 0; i < defenderCard.defense; i++) {
      defenseRolls[i] = 1 + Math.floor(Math.random() * 6);
    }

    const fullAttack = attackRolls.reduce((a, b) => a + b, 0);
    const fullDefense = defenseRolls.reduce((a, b) => a + b, 0);
    const attackResult = fullAttack - fullDefense;
    const attackSuccess = attackResult > 0;

    let defenderHealth =
      attackResult > 0
        ? defenderCard.health - attackResult
        : defenderCard.health;

    res.send({
      attackerCard: attackerCard,
      defenderCard: defenderCard,
      attackRolls: attackRolls,
      defenseRolls: defenseRolls,
      attackSuccess: attackSuccess,
      defenderRemainingHealth: defenderHealth,
    });
  } else {
    res.send({ error: "missing attacker or defender" });
  }
});

module.exports = router;
