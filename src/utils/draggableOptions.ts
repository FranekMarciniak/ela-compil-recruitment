import interact from "interactjs";

export const draggableOptions = {
  restrict: {
    restriction: "parent",
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
  },
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
};
export const resizableOptions = {
  edges: { right: true, bottom: true },
  preserveAspectRatio: true,
};
