import { getComplementColors, getTriadColors } from "./getRelatedColors";

import RelatedColorPalette from "./relatedColorPalette";

type RelatedColorsProps = {
  hexColor: string;
};

const RelatedColors = ({ hexColor }: RelatedColorsProps) => {
  const triadColors = getTriadColors(hexColor);
  const complementColors = getComplementColors(hexColor);

  return (
    <>
      <RelatedColorPalette title="Triad Colors" hexColors={triadColors} />
      <RelatedColorPalette
        title="Complementary Colors"
        hexColors={complementColors}
      />
    </>
  );
};

export default RelatedColors;
