import Head from 'next/head';

import { getEventById, getFeaturedEvents } from '../../../helpers/api-util';

import EventContent from '../../../components/event-detail/EventContent';
import EventLogistic from '../../../components/event-detail/EventLogistic';
import EventSumary from '../../../components/event-detail/EventSummary';

function EventDetailPage(props) {
   const event = props.selectedEvent;

   return (
      <>
         {!event ? (
            <div className="center">
               <p>Loading...</p>
            </div>
         ) : (
            <>
               <Head>
                  <title>{event.title}</title>
                  <meta name="description" content={event.description} />
               </Head>
               <EventSumary title={event.title} />
               <EventLogistic
                  date={event.date}
                  address={event.location}
                  image={event.image}
                  imageAlt={event.title}
               />
               <EventContent>{event.description}</EventContent>
            </>
         )}
      </>
   );
}

export async function getStaticProps(context) {
   const eventId = context.params.eventId;

   const event = await getEventById(eventId);

   return {
      props: { selectedEvent: event },
      revalidate: 30,
   };
}

export async function getStaticPaths() {
   const events = await getFeaturedEvents();

   const paths = events.map((event) => ({ params: { eventId: event.id } }));

   return {
      paths,
      fallback: 'blocking',
   };
}

export default EventDetailPage;
