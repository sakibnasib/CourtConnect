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
    {path:'/dashboard',Component:DashboardLayout,
      children:[
       {path:'manage-courts',Component:ManageCourts},
       {path:'announcements',Component:AnnouncementList},
       {path:'manage-coupons',Component:ManageCoupons}
      ]
    }

  ])