"use client";

import { ChangeEvent } from "react";

interface Props<T> {
  onMinus: (state: T) => void,
  onPlus: (state: T) => void,
  onInput: (state: T, value: string) => void,
  onCheckInput: (state: T) => void,
  context: T,
  value: number
}

const InputPlusMinus = <T,>({ onMinus, onPlus, onInput, onCheckInput, context, value }: Props<T>) => {
  return (
    <>
      <button
        className="text-white bg-slate-600 w-8 h-8 rounded-lg cursor-pointer"
        onClick={() => onMinus(context)}
      >
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onInput(context, e.target.value)
        }
        onBlur={() => {
          onCheckInput(context);
        }}
        className="border border-slate-500 mx-4 w-24 h-fit outline-0 text-center"
        maxLength={3}
      />
      <button
        className="text-white bg-slate-600 w-8 h-8 rounded-lg cursor-pointer"
        onClick={() => onPlus(context)}
      >
        +
      </button>
    </>
  );
};

export default InputPlusMinus;
