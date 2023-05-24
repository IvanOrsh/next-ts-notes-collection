type HexColorProps = {
  hexColor: string;
};

const HexColor = ({ hexColor }: HexColorProps) => {
  return <section className="information font-semibold">{hexColor}</section>;
};

export default HexColor;
