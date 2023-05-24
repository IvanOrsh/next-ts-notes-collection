type ColorSwatchProps = {
  hexColor: string;
};

const ColorSwatch = ({ hexColor }: ColorSwatchProps) => {
  return (
    <section className="flex h-80 flex-col items-center gap-2">
      <div
        className="h-full w-full border-2 border-slate-900"
        style={{ backgroundColor: hexColor }}
      ></div>
    </section>
  );
};

export default ColorSwatch;
