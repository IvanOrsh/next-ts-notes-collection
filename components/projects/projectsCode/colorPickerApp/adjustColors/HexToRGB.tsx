import { hex } from "color-convert";

import { useUpdateRGB } from "../hooks";
import LabeledInput from "@/components/common/labeledInput";
type HexToRGBProps = {
  hexColor: string;
};

const HexToRGB = ({ hexColor }: HexToRGBProps) => {
  const color = hex.rgb(hexColor);
  const [r, g, b] = color;

  const updateRGB = useUpdateRGB();

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="R"
        type="number"
        value={r}
        onChange={(e) => updateRGB([e.target.valueAsNumber, g, b])}
      />
      <LabeledInput
        label="G"
        type="number"
        value={g}
        onChange={(e) => updateRGB([r, e.target.valueAsNumber, b])}
      />
      <LabeledInput
        label="B"
        type="number"
        value={b}
        onChange={(e) => updateRGB([r, g, e.target.valueAsNumber])}
      />
    </section>
  );
};

export default HexToRGB;
