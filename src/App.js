import { useState } from "react";
import "./App.css";
import PopUp from "./popup";
import { IconName } from "react-icons/fa";

function App() {
  const [popupWindow, setpopupWindow] = useState(true);
  return (
    <div id="fullscreen">
      <div className="TopDiv">
        IoIosArrowBack
      </div>
      <div className="toggle">
        <button onClick={() => setpopupWindow(!popupWindow)}>
          Save Segment
        </button>
      </div>
      {popupWindow ? <PopUp exit={() => setpopupWindow(!popupWindow)}/> : <div />}
    </div>
  );
}

export default App;
