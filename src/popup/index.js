import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useRef, useState } from "react";
import axios from "axios";

function PopUp({exit}) {
  
  const placeholder = "Add schema to segment";
  const [selected, setSelected] = useState([placeholder]);
  const inputRef = useRef("")
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
    const map= {
      "segment_name": inputRef.current.value,
      "schema": []
    }
    selected.forEach(each=> map.schema.push({[toSnakeCase(each)] :each}))
    axios({
      method: 'post',
      url: 'https://webhook.site/6af10dc7-e805-48a5-a2ff-e21a2ca0c8c5',
      data: map
    }).then(console.log).catch(console.log)
  }

  return (
    <div className="App">
      <div>
        <h1>Save Segment  </h1>
      </div>
      <div>
        <h2>Enter the name of the segment:</h2>
        <input type="text" name="name" placeholder="Name of the segment" ref={inputRef}/>
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
