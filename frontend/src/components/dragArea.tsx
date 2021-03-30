import React, { useEffect, useState } from "react";
import Draggable from "./draggable";
import { GetElementRect, GetRectangleIntersectionArea } from "../utils";
import { Card, Rectangle } from "../types";

const DragArea = ({
  updateKey,
  draggableItems,
  dropTargets,
  dropCallback,
}: {
  updateKey: number;
  draggableItems: Array<Card>;
  dropTargets: Array<Card>;
  dropCallback?: (droppedId: string, dropTargetId: string) => void;
}) => {
  /*
  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [itemGroups]);
*/

  //const allItems = [draggableItems, dropTargets];

  type HoveredItem = { id: string; elem: HTMLElement };
  let currentHovered: HoveredItem | null = null;

  const handleDrag = (id: string, rect: Rectangle): void => {
    const hovered: HoveredItem | null = getHoveredItem(rect, id);

    if (currentHovered !== null) {
      toggleElemClass(currentHovered.elem, "hovered", false);
    }

    if (hovered === null) return;

    if (hovered.id !== null) {
      currentHovered = hovered;
      toggleElemClass(currentHovered.elem, "hovered", true);
    }
  };

  const handleDrop = (id: string, rect: Rectangle): void => {
    if (currentHovered !== null) {
      toggleElemClass(currentHovered.elem, "hovered", false);
    }

    const hovered: HoveredItem | null = getHoveredItem(rect, id);
    if (hovered === null) return;

    if (dropCallback != undefined) {
      dropCallback(id, hovered.id);
    }
  };

  const getHoveredItem = (
    testRect: Rectangle,
    dragged: string
  ): HoveredItem | null => {
    let maxArea = 0;
    let hoveredId: string | null = null;
    let hoveredElem: HTMLElement | null = null;

    for (let i = 0; i < dropTargets.length; i++) {
      const elem: HTMLElement | null = document.getElementById(
        "card" + dropTargets[i].id
      );
      const targetRect: Rectangle | null = GetElementRect(elem);
      if (targetRect !== null) {
        const area = GetRectangleIntersectionArea(testRect, targetRect);
        if (area > maxArea) {
          maxArea = area;
          hoveredId = dropTargets[i].id;
          hoveredElem = elem;
        }
      }
    }
    if (hoveredId === null || hoveredElem === null) return null;
    return { id: hoveredId, elem: hoveredElem };
  };

  const toggleElemClass = (
    elem: HTMLElement,
    className: string,
    set: boolean
  ) => {
    if (set) {
      elem.className += " " + className;
    } else {
      elem.className = elem.className.replace(" " + className, "");
    }
  };

  const DraggableElem = ({
    item,
    isDraggable,
    dragCallback,
    dropCallback,
  }: {
    item: Card;
    isDraggable: boolean;
    dragCallback?: (id: string, rect: Rectangle) => void | undefined;
    dropCallback?: (id: string, rect: Rectangle) => void | undefined;
  }) => {
    return (
      <React.Fragment>
        <Draggable
          id={item.id}
          updateKey={updateKey}
          isDraggable={isDraggable}
          dragCallback={dragCallback}
          dropCallback={dropCallback}
        >
          <span className="name">{item.name}</span>
          <span>attack: {item.attack}</span>
          <span>defense: {item.defense}</span>
          <span>health: {item.health}</span>
        </Draggable>
        <div className="spacer"></div>
      </React.Fragment>
    );
  };

  return (
    <div key={updateKey}>
      <div className="itemGroup">
        <h2>Enemies:</h2>
        {dropTargets.map((item, index) => (
          <DraggableElem
            key={"dropTarget" + index}
            item={item}
            isDraggable={false}
          />
        ))}
      </div>
      <div className="itemGroup">
        <h2>Heroes:</h2>
        {draggableItems.map((item, index) => (
          <DraggableElem
            key={"dropTarget" + index}
            item={item}
            isDraggable={true}
            dragCallback={handleDrag}
            dropCallback={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default DragArea;
