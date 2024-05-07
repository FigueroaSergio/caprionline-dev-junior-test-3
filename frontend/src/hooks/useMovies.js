import { useEffect, useState } from "react";

export const ORDER_TYPE = {
  ASC: "ASC",
  DESC: "DESC",
};

export const ORDER_BY = {
  RELEASE_DATE: "releaseDate",
  RATING: "rating",
};

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    search: "",
    order_by: ORDER_BY.RELEASE_DATE,
    order: ORDER_TYPE.DESC,
  });

  const fetchMovies = (order_by = ORDER_BY.ID, order = ORDER_TYPE.DESC) => {
    setLoading(true);

    return fetch(
      `http://localhost:8000/movies?order_by=${order_by}&order=${order}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(form.order_by, form.order);
  }, [form]);

  const onChange = (data) => {
    setForm((prev) => {
      return { ...prev, ...data };
    });
  };

  return {
    loading,
    movies,
    form,
    onChange,
  };
};
