import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ItemsPage from './components/item/ItemsPage';
import ManageItemPage from './components/item/ManageItemPage';
import ManageGroupPage from './components/group/ManageGroupPage';
import RegistrationPage from './components/registration/RegistrationPage';
import LoginPage from './components/login/LoginPage';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="registration" component={RegistrationPage} />
      <Route path="login" component={LoginPage} />
      <Route path="about" component={AboutPage} />
      <Route path="items" component={ItemsPage} />
      <Route path="item" component={ManageItemPage} />
      <Route path="item/:id" component={ManageItemPage} />
      <Route path="group" component={ManageGroupPage} />
      <Route path="group/:id" component={ManageGroupPage} />
      <Route path="courses" component={CoursesPage} />
    </Route>
);