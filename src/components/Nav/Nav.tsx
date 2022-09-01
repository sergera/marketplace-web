import { Link, useLocation } from "react-router-dom";

import { ROUTER_PATHS } from "../../constants";

export function Nav() {
	const location = useLocation();

	const routeActive = (path: string) => {
		if(location.pathname === path) {
			return true;
		}
		return false;
	}

  return (
		<nav className="nav">
			<div className="nav__link">
				<Link 
					to={ROUTER_PATHS.orders}
					style={{
						color: 'inherit',
						textDecoration: routeActive(ROUTER_PATHS.orders) ? 'underline' : 'inherit',
						padding: '0.5rem'
					}}
				>
					Orders
				</Link>
			</div>
			<div className="nav__link">
				<Link 
					to={ROUTER_PATHS.create}
					style={{
						color: 'inherit',
						textDecoration: routeActive(ROUTER_PATHS.create) ? 'underline' : 'inherit',
						padding: '0.5rem'
					}}
				>
					Create Order
				</Link>
			</div>
			<div className="nav__link">
				<Link 
					to={ROUTER_PATHS.team}
					style={{
						color: 'inherit',
						textDecoration: routeActive(ROUTER_PATHS.team) ? 'underline' : 'inherit',
						padding: '0.5rem'
					}}
				>
					Team
				</Link>
			</div>
		</nav>
  );
};
