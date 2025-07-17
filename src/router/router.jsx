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
import AskDonation from "../Dashboard/AskDonation";


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
                element: <PrivateRoute>
                    <AddPet></AddPet>
                </PrivateRoute>
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
                path: "askDonation",
                element: <AskDonation></AskDonation>
            },
            {
                path: "adoption",
                element: <PrivateRoute>
                    <AdoptionRequest></AdoptionRequest>
                </PrivateRoute>
            },


        ]
    }
]);