"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTopicForm = ({ id, title, description }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="px-8 py-2 border border-slate-500"
        type="text"
        value={newTitle}
        placeholder="Topic Title"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        className="px-8 py-2 border border-slate-500"
        type="text"
        value={newDescription}
        placeholder="Topic Description"
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button type="submit" className="px-6 py-6 text-white bg-green-600 ">
        Add topic
      </button>
    </form>
  );
};

export default EditTopicForm;
