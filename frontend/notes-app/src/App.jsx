import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import ProtectedRoute from './hoc/ProtectedRoute';
import AuthRoute from './hoc/AuthRoute';

const routes = (
  <Router>
    <Routes>
      <Route path='/' element={<ProtectedRoute element={Home} />} />
      <Route
        path='/dashboard'
        exact
        element={<ProtectedRoute element={Home} />}
      />
      <Route path='/login' exact element={<AuthRoute element={Login} />} />
      <Route path='/signup' exact element={<AuthRoute element={SignUp} />} />
    </Routes>
  </Router>
);
const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
