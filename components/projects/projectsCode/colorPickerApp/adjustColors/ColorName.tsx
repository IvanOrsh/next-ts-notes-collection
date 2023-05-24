import colorNames from "color-name-list";

type ColorType = {
  hex: string;
  name: string;
};

type ColorNameProps = {
  hexColor: string;
};

const ColorName = ({ hexColor }: ColorNameProps) => {
  const color = colorNames.find((color) => {
    return color.hex === hexColor.toLowerCase();
  });

  if (!color) return null;

  return (
    <p className="w-full border-2 border-yellow-500 bg-yellow-100 p-2 text-center text-slate-900">
      This color is called{" "}
      <span style={{ color: color.hex }}>{color.name}</span>
    </p>
  );
};

export default ColorName;
