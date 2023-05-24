import { hex } from "color-convert";

import { useUpdateCMYK } from "../hooks";
import LabeledInput from "@/components/common/labeledInput";

type HexToCMYKProps = {
  hexColor: string;
};

const HexToCMYK = ({ hexColor }: HexToCMYKProps) => {
  const color = hex.cmyk(hexColor);
  const [c, m, y, k] = color;

  const updateCMYK = useUpdateCMYK();

  return (
    <section className="grid w-full grid-flow-col gap-2">
      <LabeledInput
        label="C"
        type="number"
        value={c}
        onChange={(e) => updateCMYK([e.target.valueAsNumber, m, y, k])}
      />
      <LabeledInput
        label="M"
        type="number"
        value={m}
        onChange={(e) => updateCMYK([c, e.target.valueAsNumber, y, k])}
      />
      <LabeledInput
        label="Y"
        type="number"
        value={y}
        onChange={(e) => updateCMYK([c, m, e.target.valueAsNumber, k])}
      />
      <LabeledInput
        label="K"
        type="number"
        value={k}
        onChange={(e) => updateCMYK([c, m, y, e.target.valueAsNumber])}
      />
    </section>
  );
};

export default HexToCMYK;
