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
      <Typography
        style={{ textAlign: "center", fontSize: 18, fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Typography style={{ textAlign: "center", fontSize: 14, marginTop: 8 }}>
        {desc}
      </Typography>
    </div>
  );
}
