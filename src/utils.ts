type PointType = {
  x: number;
  y: number;
};

type ContainerPositionType = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export enum Direction {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}

export const POSITION_TEXT: Record<string, string> = {
  [Direction.LEFT]: "左",
  [Direction.RIGHT]: "右",
  [Direction.TOP]: "上",
  [Direction.BOTTOM]: "下",
};

export function getMousePosition(e: MouseEvent) {
  return { x: e.clientX, y: e.clientY } || { x: 0, y: 0 };
}

export function getContainerPosition(node: HTMLElement) {
  if (!node) return { left: 0, top: 0, width: 0, height: 0 };
  const { top, left, width, height } = node.getBoundingClientRect();
  return { left, top, width, height };
}

function isSameSide(p: PointType, o: PointType, a: PointType, b: PointType) {
  return (
    ((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) *
      ((o.x - a.x) * (b.y - a.y) - (o.y - a.y) * (b.x - a.x)) >=
    0
  );
}

export function getMouseDirection(
  containerPosition: ContainerPositionType,
  mouseEvent: MouseEvent
) {
  const { left, top, width, height } = containerPosition;
  const leftTopPoint = { x: left, y: top };
  const rightTopPoint = { x: left + width, y: top };
  const rightBottom = { x: left + width, y: top + height };
  const leftBottom = { x: left, y: top + height };
  const center = { x: left + width / 2, y: top + height / 2 };
  const mousePoint = getMousePosition(mouseEvent);
  if (
    isSameSide(mousePoint, center, leftTopPoint, rightTopPoint) &&
    isSameSide(mousePoint, leftTopPoint, center, rightTopPoint) &&
    isSameSide(mousePoint, rightTopPoint, center, leftTopPoint)
  ) {
    return Direction.TOP;
  }
  if (
    isSameSide(mousePoint, center, rightTopPoint, rightBottom) &&
    isSameSide(mousePoint, rightTopPoint, center, rightBottom) &&
    isSameSide(mousePoint, rightBottom, rightTopPoint, center)
  ) {
    return Direction.RIGHT;
  }
  if (
    isSameSide(mousePoint, center, rightBottom, leftBottom) &&
    isSameSide(mousePoint, rightBottom, center, leftBottom) &&
    isSameSide(mousePoint, leftBottom, center, rightBottom)
  ) {
    return Direction.BOTTOM;
  }
  if (
    isSameSide(mousePoint, center, leftTopPoint, leftBottom) &&
    isSameSide(mousePoint, leftTopPoint, center, leftBottom) &&
    isSameSide(mousePoint, leftBottom, center, leftTopPoint)
  ) {
    return Direction.LEFT;
  }
  return Direction.TOP;
}
