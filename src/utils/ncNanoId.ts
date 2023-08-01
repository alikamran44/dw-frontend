import { nanoid } from "@reduxjs/toolkit";

export default function ncNanoId(prefix = "daily_") {
  return prefix + nanoid() + "_";
}
