import { hex } from "color-convert";

import { useUpdateHSV } from "../hooks";
import LabeledInput from "@/components/common/labeledInput";

type HexToHSVProps = {
  hexColor: string;
};

const HexToHSV = ({ hexColor }: HexToHSVProps) => {
  const color = hex.hsv(hexColor);
  const [h, s, v] = color;

  const updateHSV = useUpdateHSV();

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="H"
        type="number"
        value={h}
        onChange={(e) => updateHSV([e.target.valueAsNumber, s, v])}
      />
      <LabeledInput
        label="S"
        type="number"
        value={s}
        onChange={(e) => {
          updateHSV([h, e.target.valueAsNumber, v]);
        }}
      />
      <LabeledInput
        label="V"
        type="number"
        value={v}
        onChange={(e) => updateHSV([h, s, e.target.valueAsNumber])}
      />
    </section>
  );
};

export default HexToHSV;
