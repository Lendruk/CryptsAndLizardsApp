import './styles.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Game from "../Game/Game";
import MapEditor from "../MapEditor/MapEditor";
import '../../themes/dark.scss';
import Campaigns from '../Campaigns/Campaigns';
import { useSelector } from 'react-redux';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { Store } from '../../Redux/reducers';

export default function MainApp() {
  const session = useSelector<Store>((state) => state.sessionReducer);
  console.log(session);
  return (
    <>
      <BrowserRouter>
        <div className="Container">
          {session ? (
          <>
          <Sidebar />
          <div className="DarkTheme MainAppOutput">
            <Switch>
              <Route exact path="/" component={Game} />
              <Route exact path="/mapEditor" component={MapEditor} />
              <Route exact path="/campaigns" component={Campaigns} />
            </Switch>
          </div>
          </>
          ) : ( 
            <div className="DarkTheme MainAppOutput">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
              </div>
          )}
  </div>
  </BrowserRouter>
    {/* <UtilBar/> */}
    </>
  );
}