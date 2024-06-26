import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      // get an update data
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (err) {
    console.log("Error fetching topics");
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <div>
      {topics.map((data, i) => (
        <div
          className="flex items-start justify-between gap-5 p-4 my-3 border border-slate-300"
          key={i}
        >
          <div>
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <div>{data.description}</div>
          </div>
          <div className="flex gap-2 ">
            <RemoveBtn id={data._id} />
            <Link href={`/editTopic/${data._id}`}>
              <div>Edit</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
