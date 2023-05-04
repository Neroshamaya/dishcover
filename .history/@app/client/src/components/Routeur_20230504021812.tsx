import { BrowserRouter, Switch, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Create from './pages/Create'

export function Router() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Navigate to="/home" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="*">
        <Navigate to="/home" />
      </Route>
    </BrowserRouter>
  )
}
