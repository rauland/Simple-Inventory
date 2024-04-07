import { useState, useEffect } from 'react';

function Today() {
  const [headerText, setHeaderText] = useState("XXXX/XX/XX");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        console.log(import.meta.env.VITE_BACKEND_URL)
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setHeaderText(data.current_date);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return <p className="text-2xl mb-4 mt-4">{headerText}</p>;
}

export default Today;