import React from 'react';
import {BrowserRouter, Route , Switch} from 'react-router-dom';
import DashboardPage from '../components/ExpenseDashboardPage';
import CreateMoneyManage from '../components/CreateMoneyManage';
import EditMoneyManage from '../components/EditMoneyManage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch> 
                <Route path="/" component={DashboardPage} exact={true}/>
                <Route path="/create" component={CreateMoneyManage} />
                <Route path="/edit/:id" component={EditMoneyManage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;