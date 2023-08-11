import {Route, Redirect, Switch} from 'react-router-dom'

import NotFound from './components/NotFound'
import Login from './components/Login'
import Home from './components/Home'
import JobItemDetails from './components/JobItemDetails'
import ProtectedRoutePath from './components/ProtectedRoutePath'
import Jobs from './components/Jobs'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.//

// Replace your code here

const App = () => (
  <>
    <Switch>
      <ProtectedRoutePath exact path="/" component={Home} />
      <ProtectedRoutePath exact path="/jobs" component={Jobs} />
      <ProtectedRoutePath exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App