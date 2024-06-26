"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTopic = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/topics?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <button onClick={removeTopic} className="text-red-400">
      Remove
    </button>
  );
};

export default RemoveBtn;
