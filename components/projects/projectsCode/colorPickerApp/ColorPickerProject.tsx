import SavedColors from "./savedColors";
import RelatedColors from "./relatedColors";
import AdjustColors from "./adjustColors";
import ColorPicker from "./colorPicker";
import { useDispatch, useHexColor, useUpdateHexCode } from "./hooks";

const ColorPickerProject = () => {
  // using OUR useContext
  const dispatch = useDispatch();
  const hexColor = useHexColor();
  const updateHexCode = useUpdateHexCode();

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 p-8 pb-40 dark:bg-slate-900 dark:text-white sm:grid-cols-2">
      <ColorPicker
        hexColor={hexColor}
        onChange={(e) =>
          dispatch({
            type: "update-hex-color",
            payload: {
              hexColor: e.target.value,
            },
          })
        }
      />
      <AdjustColors hexColor={hexColor} />
      <RelatedColors hexColor={hexColor} />
      <SavedColors hexColor={hexColor} />
    </div>
  );
};

export default ColorPickerProject;
