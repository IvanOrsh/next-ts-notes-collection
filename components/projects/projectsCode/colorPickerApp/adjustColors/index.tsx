import ColorName from "./ColorName";
import HexToCMYK from "./HexToCMYK";
import HexToHSL from "./HexToHSL";
import HexToHSV from "./HexToHSV";
import HexToRGB from "./HexToRGB";

type AdjustColorsProps = {
  hexColor: string;
};

const AdjustColors = ({ hexColor }: AdjustColorsProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3>Adjust Colors</h3>
      <HexToRGB hexColor={hexColor} />
      <HexToHSL hexColor={hexColor} />
      <HexToHSV hexColor={hexColor} />
      <HexToCMYK hexColor={hexColor} />
      <ColorName hexColor={hexColor} />
    </div>
  );
};

export default AdjustColors;
