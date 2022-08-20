import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
// import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-course-c0869-default-rtdb.firebaseio.com/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content='A list of filtered events.'
      />
    </Head>
  )

  if (!loadedEvents) {
    return (
      <>
        { pageHeadData }
        <p className='center'>Loading...</p>
      </>
    );
  }
  
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numyYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numyYear}`}
      />
    </Head>
  );

  if (
    isNaN(numyYear) ||
    isNaN(numMonth) ||
    numyYear > 2030 ||
    numyYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        { pageHeadData }
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numyYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || !filteredEvents.length) {
    return (
      <>
        { pageHeadData }
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numyYear, numMonth - 1);

  return (
    <>
      { pageHeadData }
      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${numMonth}/${numyYear}`}
        />
      </Head>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

/*export const getServerSideProps = async context => {
  const { params } = context

  const filterData = params.slug
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numyYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numyYear) ||
    isNaN(numMonth) ||
    numyYear > 2030 ||
    numyYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({ year: numyYear, month: numMonth });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numyYear,
        month: numMonth
      }
    }
  }
}*/

export default FilteredEventsPage;
