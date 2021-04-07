import { useRouter } from 'next/router';
import EventContent from '../../../components/event-detail/EventContent';
import EventLogistic from '../../../components/event-detail/EventLogistic';
import EventSumary from '../../../components/event-detail/EventSummary';
import ErrorAlert from '../../../components/ui/ErrorAlert';
import { getEventById } from '../../../data';

function EventDetailPage() {
   const router = useRouter();

   const { eventId } = router.query;

   const event = getEventById(eventId);

   return (
      <>
         {!event ? (
            <ErrorAlert>
               <p>No event found.</p>
            </ErrorAlert>
         ) : (
            <>
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

export default EventDetailPage;
