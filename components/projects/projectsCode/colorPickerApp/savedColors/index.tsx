import { useState } from "react";

import id from "lodash.uniqueid";

import AddSavedColor from "./AddSavedColor";
import SavedColor from "./SavedColor";
import { useContext } from "../context";

type SavedColorsProps = {
  hexColor: string;
};

type ColorType = {
  id: string;
  name: string;
  hexColor: string;
};

const saved: ColorType[] = [
  { id: id(), name: "1989 Miami Hotline", hexColor: "#dd3366" },
  { id: id(), name: "Blue Fire", hexColor: "#00aadd" },
];

const SavedColors = ({ hexColor }: SavedColorsProps) => {
  const [savedColors, setSavedColors] = useState(saved);
  const { dispatch } = useContext();

  return (
    <section className="flex w-full flex-col gap-4 sm:col-span-2">
      <h3>Save Color</h3>
      <AddSavedColor
        onSave={(name) =>
          setSavedColors((colors) => [...colors, { id: id(), name, hexColor }])
        }
      />
      {savedColors.map(({ id, name, hexColor }) => {
        return (
          <SavedColor
            key={id}
            name={name}
            hexColor={hexColor}
            onClick={(e) =>
              dispatch({
                type: "update-hex-color",
                payload: {
                  hexColor,
                },
              })
            }
            onRemove={() =>
              setSavedColors((colors) =>
                colors.filter((color) => color.id !== id)
              )
            }
          />
        );
      })}
    </section>
  );
};

export default SavedColors;
