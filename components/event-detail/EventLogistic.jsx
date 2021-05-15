import Image from 'next/image';

import AddressIcon from '../icons/AddressIcon';
import CalendarIcon from '../icons/CalendarIcon';
import classes from './event-logistic.module.css';

const EventLogistic = ({ date, address, image, imageAlt }) => {
   return (
      <section className={classes.logistic}>
         <div className={classes.image}>
            <Image src={image} alt={imageAlt} width={300} height={300} />
         </div>
         <div className={classes.info}>
            <div className={classes.date}>
               <CalendarIcon />
               <time>{date}</time>
            </div>
            <div className={classes.address}>
               <AddressIcon />
               <address>{address}</address>
            </div>
         </div>
      </section>
   );
};

export default EventLogistic;
