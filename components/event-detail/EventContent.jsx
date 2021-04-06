import classes from './event-content.module.css';

const EventContent = ({ children }) => {
   return <p className={classes.content}>{children}</p>;
};

export default EventContent;
