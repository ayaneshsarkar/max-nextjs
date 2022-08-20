import Head from 'next/head';
import { Fragment } from 'react';
import { getEventById, getAllEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
// import ErrorAlert from '../../components/ui/error-alert';

const EventDetailPage = props => {
  const event = props.selectedEvent

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async context => {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)
  return {
    props: {
      selectedEvent: event || null
    },
    revalidate: 30
  }
}

export const getStaticPaths = async () => {
  const events = await getAllEvents()
  const paths = events.map(event => ({ params: { eventId: event.id } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export default EventDetailPage;
