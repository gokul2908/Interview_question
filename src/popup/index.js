import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";

function PopUp() {
  const curr = "Add schema to segment";
  const [selected, setSelected] = useState([curr]);
  const schemas = [
    "Add schema to segment",
    "First Name",
    "Last Name",
    "Gender",
    "Age",
    "Account Name",
    "City",
    "State",
  ];
  const buttonClick = () => {
    setSelected((prev) => {
      const temp = [...prev];
      temp.push(schemas[0]);
      return temp;
    });
  };

  const getNonSelected = () => {
    console.log(schemas.filter((val) => !selected.includes(val)));
    return schemas.filter((val) => !selected.includes(val));
  };

  const onChange = ({ index, value }) => {
    setSelected((pre) => {
      pre[index] = value;
      return [...pre];
    });
  };

  return (
    <div className="App">
      {selected.map((each, i) => {
        return (
          <Dropdown
            options={getNonSelected()}
            onChange={(s) => onChange({ ...s, index: i })}
            value={each}
            key={i}
          />
        );
      })}
      {schemas.length - 1 != selected.length && (
        <button
          onClick={buttonClick}
          disabled={curr == selected[selected.length - 1]}
        >
          add new schema
        </button>
      )}
    </div>
  );
}

export default PopUp;
