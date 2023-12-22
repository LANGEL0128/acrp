import React from 'react'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { AdminLayout } from '../components/Admin/AdminLayout';
import { FrontLayout } from '../components/Front/FrontLayout';
import { HomeScreen } from '../components/Admin/home/HomeScreen';
import { ListPublicationScreen } from '../components/Admin/publications/ListPublicationScreen';
import { AddPublicationScreen } from '../components/Admin/publications/AddPublicationScreen';
import { EditPublicationScreen } from '../components/Admin/publications/EditPublicationScreen';
import { LoginScreen } from '../components/Admin/auth/LoginScreen';
import { ShowPublicationScreen } from '../components/Admin/publications/ShowPublicationScreen';
import { PrivateRoute } from '../helpers/PrivateRoute';
import { PublicRoute } from '../helpers/PublicRoute';
import { ListDelegationScreen } from '../components/Admin/delegations/ListDelegationScreen';
import { AddDelegationScreen } from '../components/Admin/delegations/AddDelegationScreen';
import { ShowDelegationScreen } from '../components/Admin/delegations/ShowDelegationScreen';
import { EditDelegationScreen } from '../components/Admin/delegations/EditDelegationScreen';
import { ListProjectScreen } from '../components/Admin/projects/ListProjectScreen';
import { AddProjectScreen } from '../components/Admin/projects/AddProjectScreen';
import { EditProjectScreen } from '../components/Admin/projects/EditProjectScreen';
import { ShowProjectScreen } from '../components/Admin/projects/ShowProjectScreen';
import { ListEventScreen } from '../components/Admin/events/ListEventScreen';
import { AddEventScreen } from '../components/Admin/events/AddEventScreen';
import { EditEventScreen } from '../components/Admin/events/EditEventScreen';
import { ShowEventScreen } from '../components/Admin/events/ShowEventScreen';

// Hay que implementar los PrivateRoute y PublicRoute
export const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/admin/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
            <Route path="/admin/*" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
                <Route path="" element={<HomeScreen />} />
                <Route path="delegaciones" element={<ListDelegationScreen />} />
                <Route path="delegaciones/add" element={<AddDelegationScreen />} />
                <Route path="delegaciones/edit/:id" element={<EditDelegationScreen />} />
                <Route path="delegaciones/show/:id" element={<ShowDelegationScreen />} />
                <Route path="eventos" element={<ListEventScreen />} />
                <Route path="eventos/add" element={<AddEventScreen />} />
                <Route path="eventos/edit/:id" element={<EditEventScreen />} />
                <Route path="eventos/show/:id" element={<ShowEventScreen />} />
                <Route path="publicaciones" element={<ListPublicationScreen />} />
                <Route path="publicaciones/add" element={<AddPublicationScreen />} />
                <Route path="publicaciones/edit/:id" element={<EditPublicationScreen />} />
                <Route path="publicaciones/show/:id" element={<ShowPublicationScreen />} />
                <Route path="proyectos" element={<ListProjectScreen />} />
                <Route path="proyectos/add" element={<AddProjectScreen />} />
                <Route path="proyectos/edit/:id" element={<EditProjectScreen />} />
                <Route path="proyectos/show/:id" element={<ShowProjectScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/admin" replace />} />
            {/* <Route path="/*" element={<FrontLayout />}>
                <Route path="eventos" element={<UserEvents />} />
            </Route> */}
        </Routes>
    </Router>
  )
}


