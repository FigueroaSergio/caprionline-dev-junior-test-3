import { useEffect, useState } from "react";
export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGenres = () => {
    setLoading(true);

    return fetch(`http://localhost:8000/genre`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return {
    loading,
    genres,
  };
};
