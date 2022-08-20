import Head from 'next/head';
import { Fragment } from 'react';
import { useRouter } from 'next/router'; 
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from './events-search';

const AllEventsPage = props => {
  const router = useRouter()

  const { events } = props

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name='description' content='Find a lot of events that allow you to evolve...' />
      </Head>
      <EventsSearch onSearch={findEventsHandler}  />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents()
  return {
    props: { events: events || null },
    revalidate: 70
  }
}

export default AllEventsPage;
