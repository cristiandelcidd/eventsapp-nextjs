import EventItem from './EventItem';

import classes from './event-list.module.css';

const EventList = ({ items }) => {
   return (
      <ul className={classes.list}>
         {items.map((event) => (
            <EventItem key={event.id} event={event} />
         ))}
      </ul>
   );
};

export default EventList;
