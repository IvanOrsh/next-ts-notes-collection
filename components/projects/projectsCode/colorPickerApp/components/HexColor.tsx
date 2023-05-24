type HexColorProps = {
  hexColor: string;
};

const HexColor = ({ hexColor }: HexColorProps) => {
  return (
    <section className="w-full border-2 border-yellow-500 bg-yellow-100 p-2 text-center font-semibold text-slate-900">
      {hexColor}
    </section>
  );
};

export default HexColor;
