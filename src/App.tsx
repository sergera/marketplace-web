import { Routes, Route, Navigate } from "react-router-dom";

import { ConnectedOrders as Orders } from './pages/Orders';
import { CreateOrder } from './pages/CreateOrder';
import { Team } from './pages/Team';
import { ErrorNotFound } from './pages/ErrorNotFound';

import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Footer } from "./components/Footer";

import { ConnectedModalContainer as ModalContainer } from './components/ModalContainer';
import { ConnectedNotificationContainer as NotificationContainer } from './components/NotificationContainer';
import { ConnectedToastContainer as ToastContainer } from './components/ToastContainer';

import { ErrorBoundary } from "./components/ErrorBoundary";

import { ROUTER_PATHS } from "./constants";

import './App.css';

export function App() {

  return (
		<div className="app">
			<ModalContainer />
			<NotificationContainer />
			<ToastContainer />
			<Header />
			<Nav />
			<ErrorBoundary> 
				<Routes>
						<Route path={ROUTER_PATHS.orders} element={<Orders />} />
						<Route path={ROUTER_PATHS.create} element={<CreateOrder />} />
						<Route path={ROUTER_PATHS.team} element={<Team />} />
						<Route path={ROUTER_PATHS.notFound} element={<ErrorNotFound />} />
						<Route path={"*"} element={<Navigate to={ROUTER_PATHS.notFound} />} />
				</Routes>
			</ErrorBoundary>
			<Footer />
		</div>
  );
};
