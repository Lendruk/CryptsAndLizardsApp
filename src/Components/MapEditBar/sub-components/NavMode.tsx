import { BugOutlined, DashboardOutlined, DownOutlined, FlagOutlined, ReadOutlined, SettingOutlined, UpOutlined } from '@ant-design/icons';
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
    url: '/games',
    displayTxt: 'Games',
    icon: <BugOutlined />,
    subRoutes: []
  },
  {
    url: null,
    displayTxt: 'Campaigns',
    icon: <FlagOutlined />,
    subRoutes: [
      {
        displayTxt: 'My Campaigns',
        url: '/campaigns/me',
        subRoutes: []
      },
      {
        displayTxt: 'Browse Campaings',
        url: '/campaigns',
        subRoutes: []
      }
    ]
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
];

export default function NavMode() {
  const [selectedRoute, setSelectedRoute] = useState('Dashboard');
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set());

  const onParentClick = (route: Route) => {
    setSelectedRoute(route.displayTxt)
  };

  const onParentWithChildrenClick = (route: Route) => {
    setExpandedRoutes(expandedRoutes.delete(route.displayTxt) ? new Set(expandedRoutes) : new Set(expandedRoutes).add(route.displayTxt))  
  }

  const RenderRoute = (route: Route, parent?: string) => (
    <div className={`Route ${route.subRoutes.length === 0 ? 'BorderOnHover': ''} ${parent ? 'SubRoute': ''} ${selectedRoute === route.displayTxt ? 'selected' : ''}`}>
      <section onClick={() => route.url ? onParentClick(route) : onParentWithChildrenClick(route)} className="RouteContent">
        {route.icon}
        {route.url ? (
          <Link to={route.url}>{route.displayTxt}</Link>
        ): (
          <span className="RouteDisplayText">{route.displayTxt}</span>
        )}
        {route.subRoutes.length > 0 && (expandedRoutes.has(route.displayTxt) ? <UpOutlined className="expand-button" /> : <DownOutlined className="expand-button"/>)}
      </section>
      {expandedRoutes.has(route.displayTxt) && route.subRoutes && (
        <div className="SubRouteContent" style={{ width: '100%' }}>
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