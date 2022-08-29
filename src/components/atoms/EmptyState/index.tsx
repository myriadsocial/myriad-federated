import { Typography } from "@mui/material";
import React from "react";

export default function EmptyState({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white h-full w-full rounded-[10px] justify-center items-center flex flex-col">
      <div className="text-lg text-center font-semibold">{title}</div>
      <div className="text-sm text-center mt-2">{desc}</div>
    </div>
  );
}
