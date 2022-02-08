import React, {
  cloneElement,
  useEffect,
  useState,
  ReactElement,
  ReactInstance,
} from "react";
import { findDOMNode } from "react-dom";
import interactFunc from "interactjs";
type Props = {
  children: ReactElement<any>;
  draggable?: boolean;
  resizable?: boolean;
  draggableOptions?: any;
  resizableOptions?: any;
};

function Interactive({
  children,
  draggable,
  resizable,
  draggableOptions,
  resizableOptions,
}: Props) {
  const [node, setNode] = useState<ReactElement | null>(null);
  const [interact, setInteract] = useState<any>(null);

  const clonedElement = cloneElement(children, {
    ref: (node: ReactElement) => setNode(node),
  });

  useEffect(() => {
    if (node) {
      setInteract(
        interactFunc(findDOMNode(node as unknown as ReactInstance) as any)
      );
    }
    if (interact) {
      if (draggable) interact.draggable(draggableOptions);
      if (resizable) interact.resizable(resizableOptions);
    }
  }, [
    node,
    interact,
    draggableOptions,
    draggable,
    resizable,
    resizableOptions,
  ]);

  return clonedElement;
}

export default Interactive;
