import './styles.scss';
import { Route, Switch, useHistory } from "react-router-dom";
import Game from "../Game/Game";
import MapEditor from "../MapEditor/MapEditor";
import '../../themes/dark.scss';
import Campaigns from '../Campaigns/Campaigns';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { ReduxAction, Store } from '../../Redux/reducers';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from '../../Components/MapEditBar/MapEditBar';
import { Mosaic } from 'react-mosaic-component';
import MyAssets from '../MyAssets/MyAssets';
import { useEffect } from 'react';
import API from '../../Backend/API';
import { URI_VERIFY_SESSION } from '../../Backend/endpoints';
import { Session } from '../../Redux/store';
import { logout, setEditingMap } from '../../Redux/actions';
import AssetPackEdit from '../AssetPackEdit/AssetPackEdit';

export default function MainApp() {
  const session = useSelector<Store, Session>((state) => state.sessionReducer);
  const history = useHistory();
  const inGame = useSelector<Store, ReduxAction<boolean>>((state) => state.inGame);
  const dispatch = useDispatch();
  console.log(session);

  dispatch(setEditingMap(false));

  const checkIfSessionValid = async () => {
    console.log("checking if valid", session);
    if(session) {
      try {
        await API.post<{}, {validSession: boolean}>(URI_VERIFY_SESSION, {});
      } catch {
        dispatch(logout());
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }

  useEffect(() => {
    checkIfSessionValid();
  },[]);

  const ELEMENT_MAP : { [key: string]: JSX.Element } = {
    'content':
    <div className="MainAppOutput">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/mapEditor/:id" component={MapEditor} />
        <Route exact path="/campaigns" component={Campaigns} />
        <Route exact path="/assets/me" component={MyAssets} />
        <Route exact path="/assets/edit/:id" component={AssetPackEdit} />
      </Switch>
    </div>,
    'sidebar': <Sidebar />
  }
  return (
    <>
      <div className="Container">
        <div style={{ width: '100%' }} className="DarkTheme">
        {session ? (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
              <Mosaic<string>
                  renderTile={(id) => ELEMENT_MAP[id]}
                  initialValue={{
                    direction: 'row',
                    first: 'sidebar',
                      second: 'content',
                      splitPercentage: 10,
                  }}
                  resize={{ minimumPaneSizePercentage: 3 }}
              />

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
    </>
  );
}