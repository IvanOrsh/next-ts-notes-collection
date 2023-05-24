import ColorPickerApp from "./ColorPickerApp";
import { ColorProvider } from "./context";

const ColorPickerProject = () => (
  <div className="flex h-full flex-col place-content-center items-center gap-8 bg-slate-400">
    <ColorProvider>
      <ColorPickerApp />
    </ColorProvider>
  </div>
);

export default ColorPickerProject;
