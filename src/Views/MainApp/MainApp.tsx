import './styles.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Game from "../Game/Game";
import MapEditor from "../MapEditor/MapEditor";
import '../../themes/dark.scss';
import Campaigns from '../Campaigns/Campaigns';

export default function MainApp() {
  return (
    <>
    {/* <UtilBar/> */}
    <BrowserRouter>
      <div className="Container">
        <Sidebar />
        <div className="DarkTheme MainAppOutput">
          <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/mapEditor" component={MapEditor} />
            <Route exact path="/campaigns" component={Campaigns} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    </>
  );
}