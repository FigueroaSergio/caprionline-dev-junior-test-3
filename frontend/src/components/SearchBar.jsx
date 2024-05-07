import { Label, Select } from "flowbite-react";
import { ORDER_BY, ORDER_TYPE } from "../hooks/useMovies";
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
    </div>
  );
};
