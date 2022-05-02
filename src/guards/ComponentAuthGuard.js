import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { PATH_AUTH } from '../routes/paths';

ComponentAuthGuard.propTypes = {
  children: PropTypes.node
};

export default function ComponentAuthGuard({ children }) {
  const { isAuthenticated, idToken } = useAuth();

  if (isAuthenticated && idToken) {
    return <>{children}</>;
  }
  return <Navigate to={PATH_AUTH.login} />;

}