import clsx from "clsx";
import { ChangeEventHandler, ComponentPropsWithoutRef, useId } from "react";

type LabeledInputProps = ComponentPropsWithoutRef<"input"> & {
  id?: string;
  label: string;
  value: string | number;
  type?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const LabeledInput = ({
  label,
  value,
  id,
  className,
  type = "text",
  onChange,
}: LabeledInputProps) => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  id = useId() + id;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        className={clsx("w-full", className)}
        readOnly={!onChange}
      />
    </div>
  );
};

export default LabeledInput;
