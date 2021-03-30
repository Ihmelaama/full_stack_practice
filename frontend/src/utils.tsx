import { Rectangle, Position2D } from "./types";

export const GetElementRect = (elem: HTMLElement | null): Rectangle | null => {
  const domRect: DOMRect | undefined = elem?.getBoundingClientRect();
  if (domRect === undefined) return null;
  return {
    x: domRect.left,
    y: domRect.top,
    width: domRect.width,
    height: domRect.height,
  };
};

export const GetRectangleIntersectionArea = (
  rect1: Rectangle,
  rect2: Rectangle
): number => {
  const min1: Position2D = { x: rect1.x, y: rect1.y };
  const max1: Position2D = {
    x: rect1.x + rect1.width,
    y: rect1.y + rect1.height,
  };

  const min2: Position2D = { x: rect2.x, y: rect2.y };
  const max2: Position2D = {
    x: rect2.x + rect2.width,
    y: rect2.y + rect2.height,
  };

  const overlapX: number = Math.min(max1.x, max2.x) - Math.max(min1.x, min2.x);
  const overlapY: number = Math.min(max1.y, max2.y) - Math.max(min1.y, min2.y);

  if (overlapX > 0 && overlapY > 0) {
    return overlapX * overlapY;
  }

  return 0;
};
