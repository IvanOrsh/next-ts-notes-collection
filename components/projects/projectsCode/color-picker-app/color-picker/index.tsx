import { ChangeEventHandler } from "react";
import ColorSelect from "./ColorSelect";
import ColorSwatch from "./ColorSwatch";

type ColorPickerProps = {
  hexColor: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ColorPicker = ({ hexColor, onChange }: ColorPickerProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3>Select Color</h3>
      <ColorSelect hexColor={hexColor} onChange={onChange} />
      <ColorSwatch hexColor={hexColor} />
    </div>
  );
};

export default ColorPicker;
