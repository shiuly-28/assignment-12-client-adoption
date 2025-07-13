import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainlayOut from "../layOut/MainlayOut";
import PetListing from "../pages/PetListing";
import Donation from "../pages/DonationCampaigns";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayOut from "../layOut/DashboardLayOut";
import AddPet from "../Dashboard/AddPet";
import MyPets from "../Dashboard/MyPets";
import AdoptDetails from "../pages/PetDetails";
import UpdatePet from "../Dashboard/UpdatePet";
import CreateDonation from "../Dashboard/CreateDonation";
import MyDonationCapaigns from "../Dashboard/MyDonationCapaigns";
import EditDonation from "../Dashboard/EditDonation";
import MyDonation from "../Dashboard/MyDonation";
import Adoption from "../Dashboard/Adoption";

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
                path: 'updatePet',
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
                element: <MyDonation></MyDonation>
            },
            {
                path: "adoption",
                element: <Adoption></Adoption>
            }

        ]
    }
]);