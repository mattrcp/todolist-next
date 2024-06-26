"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Post content to server
const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please enter title and description");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/topics/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a new topic");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="px-8 py-2 border border-slate-500"
        type="text"
        value={title}
        placeholder="Topic Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="px-8 py-2 border border-slate-500"
        type="text"
        value={description}
        placeholder="Topic Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="px-6 py-6 text-white bg-green-600 ">
        Add topic
      </button>
    </form>
  );
};

export default AddTopic;
