import { observer } from 'mobx-react-lite';
import React, { Suspense, useContext } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import Context from '../context/context';
import { IRouterRoute } from '../types/types';

interface AppRouterProps {
  authedRoutes?: IRouterRoute[];
  publicRoutes?: IRouterRoute[];
}

function AppRouter({
  publicRoutes,
  authedRoutes,
}: AppRouterProps) {
  const { user } = useContext(Context);
  return (
    <Suspense fallback={<LoadingScreen router />}>
      <Routes>
        {user.isRegistered && authedRoutes?.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component key={`${path}`} />}
          />
        ))}
        {publicRoutes?.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component key={`${path}`} />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

AppRouter.defaultProps = {
  publicRoutes: [],
  authedRoutes: [],
};

export default observer(AppRouter);
