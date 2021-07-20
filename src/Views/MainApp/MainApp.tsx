import './styles.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import UtilBar from "../../Components/UtilBar/UtilBar";
import Game from "../Game/Game";
import MapEditor from "../MapEditor/MapEditor";
import '../../themes/dark.scss';

export default function MainApp() {
  return (
    <>
    {/* <UtilBar/> */}
    <div className="Container">
      <Sidebar />
      <div className="DarkTheme MainAppOutput">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/mapEditor" component={MapEditor} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
    </>
  );
}