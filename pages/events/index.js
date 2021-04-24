import { useRouter } from 'next/router';

import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../helpers/api-util';

function AllEventsPage(props) {
   const router = useRouter();
   const { events } = props;

   const findEventsHandler = (year, month) => {
      const fullPath = `/events/${year}/${month}`;
      router.push(fullPath);
   };
   return (
      <div>
         <EventsSearch onSearch={findEventsHandler} />
         <EventList items={events} />
      </div>
   );
}

export async function getStaticProps() {
   const events = await getAllEvents();

   return {
      props: { events },
      revalidate: 60,
   };
}

export default AllEventsPage;
