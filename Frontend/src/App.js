import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

const SuspenseLoading = () => <>Loading...</>

// Added lazy loading for loading the component
// const Header = lazy(() => import('./Components/Header'));
const Users = lazy(() => import('./Screens/User'));
const UserDetail = lazy(() => import('./Screens/UserDetail'));

function App() {
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" exact element={<Users />} />
          <Route path="/user-detail/:id" exact element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
