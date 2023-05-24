import ColorPicker from "./color-picker";

const ColorPickerApplication = () => {
  // using OUR useContext

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 p-8 pb-40 dark:bg-slate-900 dark:text-white sm:grid-cols-2">
      <ColorPicker
        hexColor="#fff"
        onChange={(e) => console.log("noting yet")}
      />
    </div>
  );
};

export default ColorPickerApplication;
