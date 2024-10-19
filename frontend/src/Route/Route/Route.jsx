import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Home from "../../Pages/Home/Home/Home";
// import AddProperty from "../../Pages/AddProperty/AddProperty";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import ShowAllRentHouse from "../../Pages/ShowAllRentHouse/ShowAllRentHouse";
import ShowDetailsProperty from "../../Pages/ShowDetailsProperty/ShowDetailsProperty";
import ShowAllSaleHouse from "../../Pages/ShowAllSaleHouse/ShowAllSaleHouse";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashBoard from "../../Layout/DashBoard/DashBoard";
import AdminHome from "../../Layout/DashBoard/AdminHome/AdminHome";
import Users from "../../compoenets/AllUser/Users";
import ManageProperty from "../../compoenets/ManageProperty/ManageProperty";
import MyHouse from "../../Pages/UserDashboard/MyHouse";
import MyBooking from "../../Pages/MyBooking/MyBooking";
import BookingDetails from "../../Pages/BookingDetails/BookingDetails";
import Payment from "../../Layout/DashBoard/Payment/Payment";
import PaymentHistory from "../../Layout/DashBoard/PaymentHistory/PaymentHistory";
import UserDashBoard from "../../Layout/DashBoard/UserDashBoard/UserDashBoard";
import AllHouse from "../../Layout/DashBoard/AllHouse/AllHouse";
import PasswordReset from "../../Pages/Login/PasswordReset";
import AddProperty from "../../Pages/AddProperty/AddProperty";
import Booking from "../../Pages/Booking/Booking";
import PaymentDetails from "../../Layout/DashBoard/AdminHome/PayementDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addproperty",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
      {
        path: "/forgetPassword",
        element: <PasswordReset></PasswordReset>,
      },
      {
        path: "/rent",
        element: <ShowAllRentHouse></ShowAllRentHouse>,
      },
      {
        path: "/sale",
        element: <ShowAllSaleHouse></ShowAllSaleHouse>,
      },
      {
        path: "/showdetails/:id",
        element: <ShowDetailsProperty></ShowDetailsProperty>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      // {
      //   path: "/dashboard/Adminhome",
      //   element: <AdminHome></AdminHome>,
      // },
      {
        path: "/dashboard/userhome",
        element: <UserDashBoard></UserDashBoard>,
      },
      {
        path: "/dashboard/users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/addproperty",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "/dashboard/manageproperty",
        element: <ManageProperty></ManageProperty>,
      },
      // {
      //   path: "/dashboard/booking",
      //   element: <Booking></Booking>,
      // },

      //normal user route
      {
        path: "/dashboard/showdetails/:id",
        element: <ShowDetailsProperty></ShowDetailsProperty>,
      },
      {
        path: "/dashboard/allhouse",
        element: <AllHouse></AllHouse>,
        loader: () => fetch("http://localhost:5000/propertyCount"),
      },
      {
        path: "/dashboard/myhouse",
        element: <MyHouse></MyHouse>,
      },
      {
        path: "/dashboard/viewbooking/:id",
        element: <BookingDetails></BookingDetails>,
      },
      {
        path: "/dashboard/myboking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/paymentdetails/:id",
        element: <PaymentDetails></PaymentDetails>,
      },
    ],
  },
]);
