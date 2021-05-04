import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// import { getFilteredEvents } from '../../../helpers/api-util';

import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/events/ResultTitle';
import Button from '../../../components/ui/Button';
import ErrorAlert from '../../../components/ui/ErrorAlert';

function FilteredEventsPage(props) {
   const [loadedEvents, setLoadedEvents] = useState();
   const router = useRouter();

   const filteredData = router.query.slug;

   const { data, error } = useSWR(
      'https://nextjs-course-365a8-default-rtdb.firebaseio.com/events.json'
   );

   useEffect(() => {
      if (data) {
         const events = [];

         for (const key in data) {
            events.push({
               id: key,
               ...data[key],
            });
         }

         setLoadedEvents(events);
      }
   }, [data]);

   if (!loadedEvents) {
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

   const filteredEvents = loadedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
         eventDate.getFullYear() === numYear &&
         eventDate.getMonth() === numMonth - 1
      );
   });

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

// export async function getServerSideProps(context) {
//    const { params } = context;

//    const filteredData = params.slug;

//    const [filteredYear, filteredMonth] = filteredData;

//    const numYear = +filteredYear;
//    const numMonth = +filteredMonth;

//    if (
//       isNaN(numYear) ||
//       isNaN(numMonth) ||
//       numYear > 2030 ||
//       numYear < 2021 ||
//       numMonth < 1 ||
//       numMonth > 12 ||
//       error
//    ) {
//       return {
//          props: { hasError: true },
//          // notFound: true,
//          // redirect: {
//          //    destination: '/error',
//          // },
//       };
//    }

//    const filteredEvents = await getFilteredEvents({
//       year: numYear,
//       month: numMonth,
//    });

//    return {
//       props: {
//          events: filteredEvents,
//          date: {
//             year: numYear,
//             month: numMonth,
//          },
//       },
//    };
// }

export default FilteredEventsPage;
