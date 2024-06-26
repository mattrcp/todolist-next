import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return null; // Return null if there is an error
  }
};

export default async function TopicsList() {
  const result = await getTopics();

  if (!result || !result.topics) {
    return <div>Failed to load topics.</div>; // Display an error message if topics is undefined
  }

  const { topics } = result;

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="flex items-start justify-between gap-5 p-4 my-3 border border-slate-300"
        >
          <div>
            <h2 className="text-2xl font-bold">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <div>Edit</div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
