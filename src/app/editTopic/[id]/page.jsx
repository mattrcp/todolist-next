import EditTopicForm from "@/components/EditTopicForm";
import React from "react";

// Fetch topic by ID
const getTopicById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    return data; // Assuming the API returns the topic in the data object
  } catch (err) {
    console.log(err);
    return null; // Return null if there is an error
  }
};

const EditTopic = async ({ params }) => {
  const { id } = params;
  const data = await getTopicById(id);

  if (!data || !data.topic) {
    // Handle the case where the topic is not found or fetch failed
    return <div>Error loading topic.</div>;
  }

  const { title, description } = data.topic;

  return <EditTopicForm id={id} title={title} description={description} />;
};

export default EditTopic;
