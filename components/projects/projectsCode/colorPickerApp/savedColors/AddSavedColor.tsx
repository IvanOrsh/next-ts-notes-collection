import { useState } from "react";
import { Button } from "@/components/common";
import LabeledInput from "@/components/common/labeledInput";

type AddSavedColorProps = {
  onSave: (color: string) => void;
};

const AddSavedColor = ({ onSave }: AddSavedColorProps) => {
  const [savedColorName, setSavedColorName] = useState("");

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(savedColorName);
      }}
    >
      <LabeledInput
        label="Color Name"
        value={savedColorName}
        onChange={(e) => setSavedColorName(e.target.value)}
      />
      <Button variant="primary" className="w-full">
        💾 Save Color
      </Button>
    </form>
  );
};

export default AddSavedColor;
