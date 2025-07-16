import {
  createBrowserRouter
} from "react-router";
import MainLayout from '../layouts/MainLayout'
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageCourts from "../pages/Dashboard/Admin/ManageCourts";
import AnnouncementList from "../pages/Dashboard/Admin/AnnouncementList";
import CourtBooking from "../pages/Courts";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembers";
import MyProfile from "../pages/Dashboard/User/Profile";
import Announ from "../Component/Announcements/Announcements";
import PendingBookings from "../pages/Dashboard/User/PendingBookings";
import ManageBookingsApproval from "../pages/Dashboard/Admin/ManageBookings";
import PaymentPage from "../pages/Dashboard/Member/PaymentPage";
import ConfirmedBookings from "../pages/Dashboard/Member/ConfirmedBookings";
import PendingB from "../pages/Dashboard/Member/PendingBookings";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";

import MemberApprovedBookings from "../pages/Dashboard/Member/MemberApprovedBookings";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute ";
import AllProfile from "../pages/Dashboard/AllProfile/AllProfile";
import MemberRoute from "./MemberRoute";
import AdminBookingsSection from "../pages/Dashboard/Admin/AdminBookings";


export const router = createBrowserRouter ([

    {path: '/',Component:MainLayout
      ,children:[
   {index:true, Component:Home},
    {path:'courts',Component:CourtBooking}
      ]
    },
      {path:'/auth',Component:AuthLayout,
      children:[
{path:'login', Component:Login},
    {path:'register',Component:Register}
      ]
    },
    {path:'/dashboard',element:<PrivateRoute>
      <DashboardLayout/>
    </PrivateRoute>,
      children:[
        {index:true , element:<AllProfile>

        </AllProfile>},
       {path:'manage-courts',element:<AdminRoute>
        <ManageCourts/>
       </AdminRoute>},
       {path:'announcements',element:<AdminRoute>
        <AnnouncementList/>
       </AdminRoute>},
       {path:'manage-coupons',element:<AdminRoute>
        <ManageCoupons/>
       </AdminRoute>},
       {path : 'manage-bookings', element:<AdminRoute>
        <AdminBookingsSection/>
       </AdminRoute> },
       {path:'all-users',Component:AllUsers},
       {path:'bookings-approval',element:<AdminRoute>
        <ManageBookings/>
       </AdminRoute>},
       {path:'manage-members',element:<AdminRoute>
        <ManageMembers/>
       </AdminRoute>},
       {path:'userannouncements',Component:Announ},
       {path:'usersbookings',Component:PendingBookings},
       {path:'approved-bookings-member',element:<MemberRoute>
        <MemberApprovedBookings/>
       </MemberRoute>},
       {path:'payment', element:<MemberRoute>
        <PaymentPage></PaymentPage>
       </MemberRoute>},
       {path:"confirmed-bookings",element:<MemberRoute>
       <ConfirmedBookings/>
       </MemberRoute>},
       {path:'pending-bookings',Component:PendingB},
       {path:'payment-history',element:<MemberRoute>
        <PaymentHistory/>
       </MemberRoute>}
      ]
    }

  ])