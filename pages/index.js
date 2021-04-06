import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../data';

function HomePage() {
   const featuredEvents = getFeaturedEvents();

   return (
      <div>
         <EventList items={featuredEvents} />
      </div>
   );
}

export default HomePage;
