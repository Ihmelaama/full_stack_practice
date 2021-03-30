import React, { useEffect, useState } from "react";
//import styled from "styled-components";
import { Position2D, Rectangle } from "../types";

const Draggable = ({
  id,
  updateKey,
  children,
  isDraggable,
  selectCallback,
  dragCallback,
  dropCallback,
}: {
  id: string;
  updateKey: number;
  children: string | JSX.Element | Array<JSX.Element>;
  isDraggable?: boolean;
  selectCallback?: (id: string) => void;
  dragCallback?: (id: string, rect: Rectangle) => void;
  dropCallback?: (id: string, rect: Rectangle) => void;
}) => {
  const [isDragged, setDragged] = useState(false);

  let dragTarget: HTMLElement | null = null;
  let dragPlaceholder: HTMLElement | null = null;
  //let dragTargetStyle: string;
  let dragTargetRect: Rectangle;
  const pointerOffset: Position2D = { x: 0, y: 0 };

  const handleSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDraggable === false) return;

    dragTarget = e.target as HTMLElement;
    if (dragTarget === null) return;

    if (dragTarget.className !== "card") return;

    const x = e.clientX;
    const y = e.clientY;

    const rect = dragTarget.getBoundingClientRect();

    dragTargetRect = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
    pointerOffset.x = x - dragTargetRect.x;
    pointerOffset.y = y - dragTargetRect.y;

    if (!isDragged) {
      dragPlaceholder = document.createElement("div");
      dragPlaceholder.className = "card";
      dragPlaceholder.style.visibility = "hidden";
      dragTarget.after(dragPlaceholder);
    }

    dragTarget.style.position = "fixed";
    dragTarget.style.zIndex = "1000";
    dragTarget.style.width = dragTargetRect.width + "px";
    dragTarget.style.height = dragTargetRect.height + "px";
    dragTarget.style.left = x - pointerOffset.x + "px";
    dragTarget.style.top = y - pointerOffset.y + "px";

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDrop);

    if (selectCallback != undefined) {
      selectCallback(id);
    }

    setDragged(true);
  };

  const handleDrag: EventListener = (e: Event) => {
    const mouseEvent = e as MouseEvent;

    const x = mouseEvent.clientX - pointerOffset.x;
    const y = mouseEvent.clientY - pointerOffset.y;

    dragTargetRect.x = x;
    dragTargetRect.y = y;

    if (dragTarget != null) {
      dragTarget.style.left = x + "px";
      dragTarget.style.top = y + "px";
    }

    if (dragCallback !== undefined) {
      dragCallback(id, dragTargetRect);
    }
  };

  const handleDrop: EventListener = async () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleDrop);

    if (dropCallback !== undefined) {
      dropCallback(id, dragTargetRect);
    }
  };

  return (
    <div
      key={updateKey}
      className="card"
      id={"card" + id}
      draggable
      onMouseDown={(e) => {
        handleSelected(e);
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
