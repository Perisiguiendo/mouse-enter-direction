import {
  POSITION_TEXT,
  getContainerPosition,
  getMouseDirection,
} from "./utils";

const card = document.querySelector(".box") as HTMLDivElement;

const handleMouseEnter = (event: MouseEvent) => {
  const containerPosition = getContainerPosition(card);
  const direction = getMouseDirection(containerPosition, event);
  card.innerText = POSITION_TEXT[direction];
};

const handleMouseLeave = () => {
  card.innerText = "";
};

card.addEventListener("mouseenter", handleMouseEnter);
card.addEventListener("mouseleave", handleMouseLeave);

window.addEventListener("unload", () => {
  card.removeEventListener("mouseenter", handleMouseEnter);
  card.removeEventListener("mouseleave", handleMouseLeave);
});
