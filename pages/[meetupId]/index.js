import MeetupDetails from "../../components/meetups/meetupDetail";
import { getClient } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetail(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails {...props.meetupData} />
    </>
  );
}

export async function getStaticPaths() {
  const mongoClient = await getClient();
  const db = mongoClient.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    paths: meetup.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const mongoClient = await getClient();
  const db = mongoClient.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  if (!meetup) {
    return { notFound: true };
  }
  const meetupData = {
    ...meetup,
    _id: meetup._id.toString(),
  };
  return {
    props: {
      meetupData,
    },
  };
}
