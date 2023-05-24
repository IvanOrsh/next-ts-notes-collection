import { hex } from "color-convert";
import { useUpdateHSL } from "../hooks";

import LabeledInput from "@/components/common/labeledInput";

type HexToHSLProps = {
  hexColor: string;
};

const HexToHSL = ({ hexColor }: HexToHSLProps) => {
  const color = hex.hsl(hexColor);
  const [h, s, l] = color;

  const updateHSL = useUpdateHSL();

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="H"
        type="number"
        value={h}
        onChange={(e) => updateHSL([e.target.valueAsNumber, s, l])}
      />
      <LabeledInput
        label="S"
        type="number"
        value={s}
        onChange={(e) => updateHSL([h, e.target.valueAsNumber, l])}
      />
      <LabeledInput
        label="L"
        type="number"
        value={l}
        onChange={(e) => updateHSL([h, s, e.target.valueAsNumber])}
      />
    </section>
  );
};

export default HexToHSL;
