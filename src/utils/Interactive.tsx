import React, {
  cloneElement,
  useEffect,
  useState,
  ReactElement,
  ReactInstance,
} from "react";
import { findDOMNode } from "react-dom";
import interactFunc from "interactjs";
import { ICords } from "../types/Cords";
import { draggableOptions, resizableOptions } from "../utils/draggableOptions";
import { Interactable } from "@interactjs/types";
type Props = {
  children: ReactElement;
  cords: ICords;
  setCords: ({
    x_drag,
    y_drag,
    width,
    height,
    y_resize,
    x_resize,
  }: ICords) => void;
};

function Interactive({ children, cords, setCords }: Props) {
  const [node, setNode] = useState<ReactElement | HTMLElement | null>(null);
  const [interact, setInteract] = useState<Interactable | null>(null);
  const clonedElement = cloneElement(children, {
    ref: (node: ReactElement) => setNode(node),
  });

  const setLastCords = (node: HTMLElement) => {
    node.setAttribute("data-x-drag", cords.x_drag);
    node.setAttribute("data-y-drag", cords.y_drag);
    node.style.transform = (node as any).style.transform =
      "translate(" + cords.x_drag + "px, " + cords.y_drag + "px)";
    Object.assign(node.dataset, { x: cords.x_resize, y: cords.y_resize });
    Object.assign(node.style, {
      width: `${cords.width}px`,
      height: `${cords.height}px`,
    });
  };

  useEffect(() => {
    if (node) {
      setInteract(
        interactFunc(findDOMNode(node as unknown as ReactInstance) as any)
      );
    }
    if (interact) {
      setLastCords(node as HTMLElement);
      interact.draggable({
        ...draggableOptions,
        onmove: (event: any) => {
          const target = event.target;
          const x =
            (parseFloat(target.getAttribute("data-x-drag")) || cords.x_drag) +
            event.dx;
          const y =
            (parseFloat(target.getAttribute("data-y-drag")) || cords.y_drag) +
            event.dy;
          target.style.transform = target.style.transform =
            "translate(" + x + "px, " + y + "px)";
          target.setAttribute("data-x-drag", x);
          target.setAttribute("data-y-drag", y);
          setCords({ ...cords, x_drag: x.toString(), y_drag: y.toString() });
        },
      });
      interact.resizable({
        ...resizableOptions,
        onmove: function (event: any) {
          let { x, y } = event.target.dataset;
          console.log(x, y);
          console.log(parseFloat(x) + event.deltaRect.right);
          x = (parseFloat(x) || 0) + event.deltaRect.right;
          y = (parseFloat(y) || 0) + event.deltaRect.bottom;
          setCords({
            ...cords,
            width: event.rect.width,
            height: event.rect.height,
            x_resize: x.toString(),
            y_resize: y.toString(),
          });
          Object.assign(event.target.dataset, { x, y });
          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
          });
        },
      });
    }
  }, [node, interact, draggableOptions, resizableOptions]);

  return clonedElement;
}

export default Interactive;
