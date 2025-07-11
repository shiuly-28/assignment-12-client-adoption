import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainlayOut from "../layOut/MainlayOut";
import PetListing from "../pages/PetListing";
import Donation from "../pages/Donation";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayOut from "../layOut/DashboardLayOut";
import AddPet from "../Dashboard/AddPet";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainlayOut></MainlayOut>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "petListing",
                element: <PetListing></PetListing>
            },
            {
                path: "donation",
                element: <Donation></Donation>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayOut></DashboardLayOut>
        </PrivateRoute>,
        children: [
            {
                path: 'AddAPet',
                Component: AddPet
            }
        ]
    }
]);