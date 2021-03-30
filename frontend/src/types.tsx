export type Position2D = { x: number; y: number };
export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type Card = {
  id: string;
  name: string;
  attack: number;
  defense: number;
  health: number;
  isDraggable: boolean;
  isDropTarget: boolean;
};
export type AttackResults = {
  attackerCard: Card;
  defenderCard: Card;
  attackRolls: Array<number>;
  defenseRolls: Array<number>;
  attackSuccess: boolean;
  defenderRemainingHealth: number;
};
