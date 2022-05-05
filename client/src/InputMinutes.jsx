import React from "react";
import { InputNumber, Slider } from "antd";

export default function InputMinutes({
  min,
  max,
  id,
  defaultValue,
  update,
  disabled,
}) {
  return (
    <InputNumber
      min={min}
      max={max}
      defaultValue={defaultValue}
      onChange={(change) => update(change, id)}
      disabled={disabled}
    />
  );
}
