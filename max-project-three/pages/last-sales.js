import useSWR from "swr";
import { useEffect, useState } from "react"

const LastSales = props => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(
    'https://nextjs-course-c0869-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({ 
          id: key, 
          username: data[key].username,
          volume: data[key].volume
        })
      }

      setSales(transformedSales)
    }
  }, [data]);

  /*useEffect(() => {
    setIsLoading(true);
    fetch('https://nextjs-course-c0869-default-rtdb.firebaseio.com/sales.json')
      .then(response => response.json())
      .then(data => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({ 
            id: key, 
            username: data[key].username,
            volume: data[key].volume
          })
        }

        setSales(transformedSales)
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error)
        setIsLoading(false);
      })
  }, [])*/

  if (error) {
    return <p>Failed to load</p>
  }

  if (!data && !sales) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {
        sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)
      }
    </ul>
  )
}

export default LastSales

export const getStaticProps = async () => {
  const response = await fetch(
    'https://nextjs-course-c0869-default-rtdb.firebaseio.com/sales.json'
  );

  const data = await response.json()

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({ 
      id: key, 
      username: data[key].username,
      volume: data[key].volume
    })
  }

  return { props: { sales: transformedSales, }, revalidate: 10 }
}