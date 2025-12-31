import { useRouter } from "next/router";
import { useState } from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetup() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  async function addMeetupHandler(meetupData) {
    try {
      setSubmitting(true); //set submitting state to true
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setSubmitting(false);
        throw new Error("Failed to add meetup");
      }
      router.push("/"); //redirect to homepage after submission
    } catch (error) {
      console.error("Error adding meetup:", error);
      setSubmitting(false); //reset submitting state on error
    }
  }
  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler} submitting={submitting} />
  );
}
