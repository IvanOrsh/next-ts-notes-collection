import { MouseEventHandler } from "react";

import { Button } from "@/components/common";
import ColorChangeSwatch from "../components/ColorChangeSwatch";

type SavedColorPros = {
  name: string;
  hexColor: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onRemove?: () => void;
};

const SavedColor = ({ name, hexColor, onClick, onRemove }: SavedColorPros) => {
  return (
    <article className="flex place-content-between items-center gap-2">
      <ColorChangeSwatch hexColor={hexColor} onClick={onClick} />
      <h3 className="whitespace-nowrap text-sm">{name}</h3>
      <Button variant="destructive" size="small" onClick={onRemove}>
        Remove
      </Button>
    </article>
  );
};

export default SavedColor;
