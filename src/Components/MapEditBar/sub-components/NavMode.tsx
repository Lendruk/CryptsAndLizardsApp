import { DashboardOutlined, FlagOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Route = {
  url: string;
  displayTxt: string;
  icon?: ReactElement<any,any>;
  subRoutes: Route[];
}

const ROUTES: Route[] = [
  {
    url: '/',
    displayTxt: 'Dashboard',
    icon: <DashboardOutlined />,
    subRoutes: []
  },
  {
    url: '/campaigns',
    displayTxt: 'Campaigns',
    icon: <FlagOutlined />,
    subRoutes: []
  },
  {
    url: '/settings',
    displayTxt: 'Settings',
    icon: <SettingOutlined />,
    subRoutes: []
  }
]


export default function NavMode() {
  const [selectedRoute, setSelectedRoute] = useState('/');

  const RenderRoute = (route: Route) => (
    <div className={`Route ${selectedRoute === route.url ? 'selected' : ''}`}>
      {route.icon}
      <Link onClick={() => setSelectedRoute(route.url)} to={route.url}>{route.displayTxt}</Link>
    </div>
  )

  return (
    <div className="NavMode">
      {ROUTES.map(route => RenderRoute(route))}
    </div>
  )
}