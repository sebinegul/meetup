import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
const MeetupDetail = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetUpData.title}</title>
      </Head>
      <MeetupDetails
        image={props.meetUpData.image}
        title={props.meetUpData.title}
        description={props.meetUpData.description}
        address={props.meetUpData.address}
      />
    </Fragment>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sebinegul:hx49yuAxHWH3ytmC@cluster0.cgypy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollections = db.collection("meetups");
  const meetUps = await meetUpCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetUps.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://sebinegul:hx49yuAxHWH3ytmC@cluster0.cgypy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollections = db.collection("meetups");
  const selectedMeetup = await meetUpCollections.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetail;
