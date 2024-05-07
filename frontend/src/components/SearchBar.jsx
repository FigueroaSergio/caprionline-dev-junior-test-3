import { Checkbox, Dropdown, Label, Select } from "flowbite-react";
import { ORDER_BY, ORDER_TYPE } from "../hooks/useMovies";
import { useGenres } from "../hooks/useGenres";
export const SearchBar = ({ form, onChange }) => {
  const options = [
    {
      value: `${ORDER_BY.RELEASE_DATE}-${ORDER_TYPE.DESC}`,
      label: "Più recenti",
    },
    {
      value: `${ORDER_BY.RATING}-${ORDER_TYPE.DESC}`,
      label: "Rating (Decrescente)",
    },
    {
      value: `${ORDER_BY.RATING}-${ORDER_TYPE.ASC}`,
      label: "Rating (Ascendente)",
    },
  ];
  const { loading, genres } = useGenres();
  const handlerChange = (data) => {
    if (onChange) {
      onChange(data);
    }
  };
  const handlerChangeOrdine = (e) => {
    const v = e.target.value.split("-");
    const order_by = v[0];
    const order = v[1];
    handlerChange({ order_by, order });
  };
  const handlerChangeGenere = (e) => {
    const cp = [...form.genres];
    const index = cp.indexOf(e.target.value);
    if (index > -1) {
      // only splice array when item is found
      cp.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      cp.push(e.target.value);
    }

    handlerChange({ genres: cp });
  };
  return (
    <div className="py-8 max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="order" value="Ordina per:" />
      </div>
      <Select
        id="order"
        value={`${form.order_by}-${form.order}`}
        onChange={handlerChangeOrdine}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      <div className="mb-2 block">
        <Label htmlFor="genres" value="Filtro per genere:" />
      </div>
      <Dropdown label="Genere" dismissOnClick={false} disabled={loading} isProcessing={loading}>
        {genres.map((opt) => (
          <Dropdown.Item key={opt.id}>
            <Checkbox
              value={opt.id}
              checked={form.genres.includes(String(opt.id))}
              onChange={handlerChangeGenere}
            ></Checkbox>
            <Label>{opt.name}</Label>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};
