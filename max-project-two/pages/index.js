import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

const Home = props => {
  return (
    <div>
      <Head>
        <title>Next JS Event</title>
        <meta name='description' content='Find a lot of events that allow you to evolve...' />
      </Head>
      <EventList items={props.events} />
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 2500
  }
}

export default Home;
