import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import LiabilityAgreement from './pages/LiabilityAgreement';
import FinalizeRental from './pages/FinalizeRental';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "HowItWorks": HowItWorks,
    "Checkout": Checkout,
    "Success": Success,
    "LiabilityAgreement": LiabilityAgreement,
    "FinalizeRental": FinalizeRental,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};