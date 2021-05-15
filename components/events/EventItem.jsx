import Image from 'next/image';

import AddressIcon from '../icons/AddressIcon';
import ArrowRight from '../icons/ArrowRight';
import CalendarIcon from '../icons/CalendarIcon';
import Button from '../ui/Button';

import classes from './event-item.module.css';

const EventItem = ({ event }) => {
   const { id, title, image, date, location } = event;

   const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   const formattedAddress = location.replace(',', '\n');

   const exploreLink = `/events/${id}`;

   return (
      <li className={classes.item}>
         <Image src={image} alt={title} width={250} height={160} />
         <div className={classes.content}>
            <div className={classes.summary}>
               <h2>{title}</h2>
               <div className={classes.date}>
                  <CalendarIcon />
                  <time>{humanReadableDate}</time>
               </div>
               <div className={classes.address}>
                  <AddressIcon />
                  <address>{formattedAddress}</address>
               </div>
            </div>
            <div className={classes.actions}>
               <Button link={exploreLink}>
                  <span>Explore Event</span>
                  <span className={classes.icon}>
                     <ArrowRight />
                  </span>
               </Button>
            </div>
         </div>
      </li>
   );
};

export default EventItem;
