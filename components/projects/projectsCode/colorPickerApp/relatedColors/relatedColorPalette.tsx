import { useUpdateHexCode } from "../hooks";
import ColorChangeSwatch from "../components/ColorChangeSwatch";

type RelatedColorPaletteProps = {
  title: string;
  hexColors: string[];
};

const RelatedColorPalette = ({
  title,
  hexColors,
}: RelatedColorPaletteProps) => {
  const updateHexCode = useUpdateHexCode();

  return (
    <section>
      <h3 className="mb-4">{title}</h3>
      <div className="grid grid-cols-3 gap-2">
        {hexColors.map((hexColor) => {
          return (
            <ColorChangeSwatch
              key={hexColor}
              hexColor={hexColor}
              className="h-full w-full"
              onClick={(e) => updateHexCode(hexColor)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RelatedColorPalette;
