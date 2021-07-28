import { DashboardOutlined, FlagOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Route = {
  url: string | null;
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
    url: null,
    displayTxt: 'Assets',
    icon: <ReadOutlined />,
    subRoutes: [
      {
        displayTxt: 'My Assets',
        url: '/assets/me',
        subRoutes: []
      },
      {
        displayTxt: 'Browse Assets',
        url: '/assets',
        subRoutes: []
      }
    ]
  },
  {
    url: '/settings',
    displayTxt: 'Settings',
    icon: <SettingOutlined />,
    subRoutes: []
  }
]


export default function NavMode() {
  const [selectedRoute, setSelectedRoute] = useState('Dashboard');

  const RenderRoute = (route: Route, parent?: string) => (
    <div className={`Route ${route.subRoutes.length === 0 ? 'BorderOnHover': ''} ${parent ? 'SubRoute': ''} ${selectedRoute === route.displayTxt ? 'selected' : ''}`}>
      <section style={{ width: '100%' }}>
        {route.icon}
        {route.url ? (
          <Link onClick={() => setSelectedRoute(route.displayTxt)} to={route.url}>{route.displayTxt}</Link>
        ): (
          <span>{route.displayTxt}</span>
        )}
      </section>
      {route.subRoutes && (
        <div style={{ width: '100%' }}>
          {route.subRoutes.map(subRoute => RenderRoute(subRoute, route.displayTxt))}
        </div>
      )}
    </div>
  )

  return (
    <div className="NavMode">
      {ROUTES.map(route => RenderRoute(route))}
    </div>
  )
}