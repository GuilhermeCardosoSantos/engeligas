"use client";

import { useRef } from "react";

interface OtpInputProps {
  required?:boolean
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OtpInput({
  length,
  value,
  onChange,
  required
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    inputValue: string
  ) => {
    if (!/^\d?$/.test(inputValue)) return;

    const newValue = [...value];
    newValue[index] = inputValue;

    onChange(newValue);

    if (
      inputValue &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map(
        (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            required={required}
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) =>
              handleChange(
                index,
                e.target.value
              )
            }
            onKeyDown={(e) =>
              handleKeyDown(index, e)
            }
            className="h-14 w-14 rounded-lg border border-gray-300 bg-transparent text-center text-lg font-semibold text-gray-800 outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:text-white dark:focus:border-engeligas-500"
          />
        )
      )}
    </div>
  );
}