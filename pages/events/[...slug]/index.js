import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../../data';

import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/ResultTitle';
import Button from '../../../components/ui/Button';
import ErrorAlert from '../../../components/ui/ErrorAlert';

function FilteredEventsPage() {
   const router = useRouter();

   const filteredData = router.query.slug;

   if (!filteredData) {
      return <p className="center">Loading...</p>;
   }

   const [filteredYear, filteredMonth] = filteredData;

   const numYear = +filteredYear;
   const numMonth = +filteredMonth;

   if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
   ) {
      return (
         <>
            <ErrorAlert>
               <p>Invalid filter. Please adjust your values.</p>
            </ErrorAlert>
            <div className="center">
               <Button link="/events">Show All Events</Button>
            </div>
         </>
      );
   }

   const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

   const date = new Date(numYear, numMonth - 1);

   return (
      <>
         {!filteredEvents || filteredEvents.length === 0 ? (
            <>
               <ErrorAlert>
                  <p>No events found for the chosen filter.</p>
               </ErrorAlert>
               <div className="center">
                  <Button link="/events">Show All Events</Button>
               </div>
            </>
         ) : (
            <>
               <ResultsTitle date={date} />
               <EventList items={filteredEvents} />
            </>
         )}
      </>
   );
}

export default FilteredEventsPage;
