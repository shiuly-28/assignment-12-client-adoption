import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainlayOut from "../layOut/MainlayOut";
import PetListing from "../pages/PetListing";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayOut from "../layOut/DashboardLayOut";
import AddPet from "../Dashboard/AddPet";

import AdoptDetails from "../pages/PetDetails";
import UpdatePet from "../Dashboard/UpdatePet";
import CreateDonation from "../Dashboard/CreateDonation";
import MyDonationCapaigns from "../Dashboard/MyDonationCampaigns";
import EditDonation from "../Dashboard/EditDonation";

import DonationCampaigns from "../pages/DonationCampaigns";
import MyPets from "../Dashboard/MyPets";
import AdoptionRequest from "../Dashboard/AdoptionRequest";
import MyDonations from "../Dashboard/MyDonations";
import DonationDetails from "../pages/DonationDetails";

import DonatePayment from "../Dashboard/DonatePayment";
import AllUsers from "../Dashboard/Admin/AllUsers";
import DashBoardHome from "../Dashboard/DashBoardHome";
import AdminRoute from "../hooks/AdminRoute";

import Forbiden from "../pages/Forbiden/Forbiden";
import AllPets from "../Dashboard/Admin/AllPets";
import AllDonations from "../Dashboard/Admin/AllDonations";
import MyProfile from "../Dashboard/MyProfile";
import Overveiw from "../Dashboard/Overveiw";
import CampaginDetails from "../pages/CampaginDetails";


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
                element: <DonationCampaigns></DonationCampaigns>
            },
            {
                path: "donationDetails/:id",
                element: <DonationDetails></DonationDetails>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "/adoptDetails/:id",
                element: <AdoptDetails></AdoptDetails>
            },
            {
                path: '/campaginDetails/:id',
                element: <CampaginDetails></CampaginDetails>
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
                index: true,
                element: <DashBoardHome></DashBoardHome>
            },
            {
                path: 'AddAPet',
                element: <PrivateRoute>
                    <AddPet></AddPet>
                </PrivateRoute>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'dashBoardHome',
                element: <DashBoardHome></DashBoardHome>
            },
            {
                path: 'overveiw',
                element: <Overveiw></Overveiw>
            },

            {
                path: 'myPets',
                element: <PrivateRoute>
                    <MyPets></MyPets>
                </PrivateRoute>
            },

            {
                path: 'updatePet/:id',
                element: <PrivateRoute>
                    <UpdatePet></UpdatePet>
                </PrivateRoute>
            },
            {
                path: 'createDonation',
                element: <PrivateRoute>
                    <CreateDonation></CreateDonation>
                </PrivateRoute>
            },
            {
                path: 'myDonationCampaigns',
                element: <MyDonationCapaigns></MyDonationCapaigns>
            },
            {
                path: "editDonation",
                element: <EditDonation></EditDonation>
            },
            {
                path: "myDonation",
                element: <MyDonations></MyDonations>
            },
            {
                path: 'editDonation/:id',
                element: <PrivateRoute>
                    <EditDonation></EditDonation>
                </PrivateRoute>
            },
            {
                path: 'donatePayment/:id',
                element: <DonatePayment></DonatePayment>
            },

            {
                path: "adoption",
                element: <AdoptionRequest></AdoptionRequest>
            },
            {
                path: 'fobiden',
                element: <Forbiden></Forbiden>
            },

            {
                path: "all-users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "all-pets",
                element: <AdminRoute><AllPets /></AdminRoute>
            },
            {
                path: "all-donations",
                element: <AdminRoute><AllDonations /></AdminRoute>
            },
        ]
    }
]);