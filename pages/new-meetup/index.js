import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
 async function addMeetUpHandler(enteredMeetUpData) {
  const response = await fetch("/api/new-meetups" , {
    method : "POST",
    body :JSON.stringify(enteredMeetUpData),
    headers : {
      "Content-Type" : "application/json"
    }
  })
  const data = await response.json();
  console.log(data);

  router.push('/');

  };
  return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
};
export default NewMeetupPage;
