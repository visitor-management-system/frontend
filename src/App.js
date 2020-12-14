import VisitorEntry from "./components/VisitorEntry";
import VisitorExit from "./components/VisitorExit";
import ShowList from "./components/ShowList";

function App() {
  return (
    <div style={{display: "flex", padding: "10px"}}>
      <div style={{marginRight: "10px"}}>
        <VisitorEntry />
        <VisitorExit />
      </div>
      <div style={{flexGrow: 1}}>
        <ShowList />
      </div>
    </div>
  );
}

export default App;
