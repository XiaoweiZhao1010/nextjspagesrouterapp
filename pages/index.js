import { revalidatePath } from "next/cache";
import MeetupList from "../components/meetups/MeetupList";
import { getClient } from "../lib/mongodb";

export default function Home(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
// Run on the server side
// Runs on every request
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API or databaser
//   return {
//     props: {
//       meetups: meetups,
//     },
//   };
// }
// Runs on build time and periodically (if revalidate is set)
export async function getStaticProps() {
  const mongoClient = await getClient();
  const meetups = await mongoClient.db().collection("meetups").find().toArray();
  const meetupsData = meetups.map((meetup) => ({
    ...meetup,
    _id: meetup._id.toString(),
  }));
  return {
    props: {
      meetups: meetupsData,
    },
    revalidate: 10, // in seconds
  };
}
