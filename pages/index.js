import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head';
import { Fragment } from "react";
const Homepage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sebinegul:hx49yuAxHWH3ytmC@cluster0.cgypy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpsCollections = db.collection("meetups");
  const meetups = await meetUpsCollections.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
  };
}
export default Homepage;
