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
import { ListInterestScreen } from '../components/Admin/interest/ListInterestScreen';
import { AddInterestScreen } from '../components/Admin/interest/AddInterestScreen';
import { EditInterestScreen } from '../components/Admin/interest/EditInterestScreen';
import { ListUserScreen } from '../components/Admin/user/ListUserScreen';
import { AddUserScreen } from '../components/Admin/user/AddUserScreen';
import { EditUserScreen } from '../components/Admin/user/EditUserScreen';
import { ShowUserScreen } from '../components/Admin/user/ShowUserScreen';
import { ProfileScreen } from '../components/Admin/auth/ProfileScreen';
import { PrincipalScreen } from '../components/Front/home/PrincipalScreen';
import { FrontInscriptionScreen } from '../components/Front/member/FrontInscriptionScreen';
import { FrontShowMemberScreen } from '../components/Front/member/FrontShowMemberScreen';
import { FrontMemberScreen } from '../components/Front/member/FrontMemberScreen';
import { FrontEventScreen } from '../components/Front/event/FrontEventScreen';
import { FrontPublicationScreen } from '../components/Front/publication/FrontPublicationScreen';
import { FrontShowDelegationScreen } from '../components/Front/delegation/FrontShowDelegationScreen';
import { FrontDelegationScreen } from '../components/Front/delegation/FrontDelegationScreen';
import { FrontProjectScreen } from '../components/Front/project/FrontProjectScreen';

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
                <Route path="intereses" element={<ListInterestScreen />} />
                <Route path="intereses/add" element={<AddInterestScreen />} />
                <Route path="intereses/edit/:id" element={<EditInterestScreen />} />
                <Route path="usuarios" element={<ListUserScreen />} />
                <Route path="usuarios/add" element={<AddUserScreen />} />
                <Route path="usuarios/edit/:id" element={<EditUserScreen />} />
                <Route path="usuarios/show/:id" element={<ShowUserScreen />} />
                <Route path="perfil" element={<ProfileScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="" element={<FrontLayout />}>
                <Route path="" element={<PrincipalScreen />} />
                <Route path="/delegaciones" element={<FrontDelegationScreen />} />
                <Route path="/delegaciones/show/:id" element={<FrontShowDelegationScreen />} />
                <Route path="/publicaciones" element={<FrontPublicationScreen />} />
                <Route path="/proyectos" element={<FrontProjectScreen />} />
                <Route path="/eventos" element={<FrontEventScreen />} />
                <Route path="/miembros" element={<FrontMemberScreen />} />
                <Route path="/miembros/show/:id" element={<FrontShowMemberScreen />} />
                <Route path="/inscribirse" element={<FrontInscriptionScreen />} />
            </Route>
        </Routes>
    </Router>
  )
}


