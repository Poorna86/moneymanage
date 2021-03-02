import React from 'react';
import {Router, Route , Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import DashboardPage from '../components/ExpenseDashboardPage';
import CreateMoneyManage from '../components/CreateMoneyManage';
import EditMoneyManage from '../components/EditMoneyManage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';

export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={HomePage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/create" component={CreateMoneyManage} />
                <PrivateRoute path="/edit/:id" component={EditMoneyManage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;