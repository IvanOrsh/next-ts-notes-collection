import { ChangeEventHandler } from "react";

import HexColor from "../components/HexColor";
import LabeledInput from "@/components/common/labeled-input";

type ColorSelectProps = {
  hexColor: string;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ColorSelect = ({
  hexColor,
  label = "Color",
  onChange,
}: ColorSelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <LabeledInput
        label="Color"
        id="color-input"
        className="h-80 w-full"
        type="color"
        value={hexColor}
        onChange={onChange}
      />
      <HexColor hexColor={hexColor} />
    </div>
  );
};

export default ColorSelect;
