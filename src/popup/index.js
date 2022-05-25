import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";

function PopUp({exit}) {
  const placeholder = "Add schema to segment";
  const [selected, setSelected] = useState([placeholder]);
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

  const toSnakeCase = (str = '') => {
    const strArr = str.split(' ');
    const snakeArr = strArr.reduce((acc, val) => {
       return acc.concat(val.toLowerCase());
    }, []);
    return snakeArr.join('_');
 };

  const save = ()=> {
    if (selected[selected.length-1] == placeholder){
      selected.pop()
    }
    // const temp = selected.map(each=> toSnakeCase(each))
    const map= {}
    selected.forEach(each=> map[toSnakeCase(each)] = each)
    console.log(map)
  }

  return (
    <div className="App">
      <div>
        <h1>Save Segment  </h1>
      </div>
      <div>
        <h2>Enter the name of the segment:</h2>
        <input type="text" name="name" placeholder="Name of the segment"/>
      </div>
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
          disabled={placeholder == selected[selected.length - 1]}
        >
          add new schema
        </button>
      )}
      <div className="bottom">
        <button onClick={save}>Save the segment</button>
        <button onClick={exit}>Cancel</button>
      </div>
    </div>
  );
}

export default PopUp;
