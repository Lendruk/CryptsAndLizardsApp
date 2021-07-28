import './styles.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "../Game/Game";
import MapEditor from "../MapEditor/MapEditor";
import '../../themes/dark.scss';
import Campaigns from '../Campaigns/Campaigns';
import { useSelector } from 'react-redux';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { ReduxAction, Store } from '../../Redux/reducers';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from '../../Components/MapEditBar/MapEditBar';

export default function MainApp() {
  const session = useSelector<Store>((state) => state.sessionReducer);
  const inGame = useSelector<Store, ReduxAction<boolean>>((state) => state.inGame);
  console.log(inGame);
  return (
    <>
      <BrowserRouter>
        <div className="Container">
          <div style={{ width: '100%' }}className="DarkTheme">
          {session ? (
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
              <Sidebar />
              <div className="MainAppOutput">
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/game" component={Game} />
                  <Route exact path="/mapEditor" component={MapEditor} />
                  <Route exact path="/campaigns" component={Campaigns} />
                </Switch>
              </div>
            </div>
          ) : ( 
            <div className="MainAppOutput">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          )}    
        </div>
  </div>
  </BrowserRouter>
    </>
  );
}