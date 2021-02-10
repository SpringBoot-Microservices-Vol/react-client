import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import './App.css';

import Candidates from "../Candidates";
import Supervisors from "../Supervisors/Supervisors";
import HallsTable from "../Halls";
import Home from "../Home";
import Nothing from "../Nothing";
import Layout from "./Layout";
import NavigationBar from "./NavigationBar";
import Jumbotron from "./Jumbotron";
import IndividualHall from "../Hall";
import Reports from "../Reports";
import MyProvider from "../MyProvider";
import Login from "../Login";
import {authService} from "../utils/API";
import Grades from "../Grades";
import Categories from "../Categories/Categories";
import CandidatesOptions from "../CanidatesOptions/CandidatesOptions";

class App extends Component {

    render() {
        return (
            <MyProvider>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <PrivateRoute
                                path={['/home', '/categories', '/candidates', '/candidates_options', '/supervisors', '/halls', '/halls/:id', '/grades', '/reports']}
                                component={() => <><NavigationBar/><Jumbotron/></>}/>
                        </Switch>
                        <Layout>
                            <Switch>
                                <PrivateRoute exact path="/home" component={Home}/>
                                <PrivateRoute exact path="/categories" component={Categories}/>
                                <PrivateRoute path="/candidates" exact={true} component={Candidates}/>
                                <PrivateRoute path="/candidates_options" exact={true} component={CandidatesOptions}/>
                                <PrivateRoute path="/supervisors" exact={true} component={Supervisors}/>
                                <PrivateRoute path="/halls" exact={true} component={HallsTable}/>
                                <PrivateRoute path="/halls/:id" component={IndividualHall}/>
                                <PrivateRoute path="/grades" exact={true} component={Grades}/>
                                <PrivateRoute path="/reports" exact={true} component={Reports}/>
                                <Route path="/login" exact={true} component={Login}/>
                                <Redirect from={'/'} to={'/login'} exact={true}/>
                                <Route component={Nothing}/>
                            </Switch>
                        </Layout>
                    </React.Fragment>
                </Router>
            </MyProvider>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    if (authService.isAuthenticated())
        authService.login(authService.getToken());

    return <Route {...rest}
                  render={(props) => authService.isAuthenticated() ? <Component {...props}/> :
                      <Redirect to={'/login'}/>}/>
};

export default App;