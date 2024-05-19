import {createBrowserRouter, Outlet, RouterProvider,} from "react-router-dom";
import Home from "./pages/dashboard/Home.jsx";
import Login from "./pages/auth/Login";
import {Toaster} from "react-hot-toast";
import Register from "./pages/register/Register.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/reset-password/ResetPassword.jsx";
import VerificationClient from "./pages/verify-account/VerificationClient.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Settings from "./pages/settings/Settings.jsx";
import UpdatePassword from "./pages/updatePassword/updatePassword.jsx";
import Billing from "./pages/billing/Billing.jsx";
import {useEffect} from "react";
import Integrations from "./pages/integrations-new/Integrations.jsx";
import Customer from "./pages/customers/Customer.jsx";
import UpdateCustomer from "./pages/updateCustomer/UpdateCustomer.jsx";
import Management from "./pages/management/Management.jsx";
import ManagementTeam from "./pages/managementTeam/ManagementTeam.jsx";
import CreateTeam from "./pages/createTeam/CreateTeam.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "./redux/user/userThunk.js";
import {selectCurrentUser} from "./redux/user/userSlice.js";
import {isEmptyObject} from "./utils/generalFunctions.js";
import SelectDomain from "./pages/selectDomain/SelectDomain.jsx";
import Kiosk from "./pages/kiosk/Kiosk.jsx";
import Template from "./pages/template/Template";
import TemplateContainer from "./pages/template/components/TemplateContainer";
import FormBuilder from "./pages/template/components/FormBuilder";
import FormRender from "./pages/template/components/FormRender";
import SplashScreen from "./pages/kiosk/components/SplashScreen";
import SuccessState from "./pages/template/components/SuccessState";
import Overview from "./pages/template/components/Overview";
import NotFound from "./pages/NotFound";
import Setting from "./pages/template/components/Setting";
import Integration from "./pages/template/components/Integration";
import Submissions from "./pages/template/components/Submissions";
import SubmissionView from "./pages/SubmissionView";
import SignedWaivers from "./pages/signedWaivers/SignedWaiver";
import CustomerSubmissions from "./pages/customerSubmission/CustomerSubmissions";
import Configure from "./pages/integrations-new/Configure";
import TemplateGallery from "./pages/templateGallery/TemplateGallery";
import Preview from "./pages/preview/Preview";

const router = createBrowserRouter([
  //client Routes
  {
    path: '/', element: (<Login/>),
  }, {
    path: '/register', element: (<Register/>)
  }, {
    path: '/forgot-password', element: (<ForgotPassword/>)
  }, {
    path: '/reset-password/:id', element: (<ResetPassword/>)
  }, {
    path: '/verify-account/:hashId/:id', element: (<VerificationClient/>)
  }, {
    path: '/domain/select', element: (<SelectDomain/>)
  }, {
    path: '/dashboard', element: (<ProtectedRoute>
      <Home/>
    </ProtectedRoute>)
  }, {
    path: '/settings', element: (<ProtectedRoute>
      <Outlet/>
    </ProtectedRoute>), children: [{
      path: 'account', element: <Settings/>
    }, {
      path: 'integrations', element: <Integrations/>
    }, {
      path: 'password', element: <UpdatePassword/>
    }, {
      path: 'configure/:id', element: <Configure/>
    }]
  }, {
    path: '/billing', element: (<ProtectedRoute>
      <Billing/>
    </ProtectedRoute>)
  }, {
    path: '/customers', element: (<ProtectedRoute>
      <Outlet/>
    </ProtectedRoute>), children: [{
      index: true, element: <Customer/>
    }, {
      path: ':id/edit', element: <UpdateCustomer/>
    }, {
      path: ':customerId', element: <CustomerSubmissions/>
    }]
  }, {
    path: 'gallery', element: <ProtectedRoute>
      <TemplateGallery/>
    </ProtectedRoute>
  }, {
    path: '/templates', element: (
    // <ProtectedRoute>
      <Outlet/>
    // </ProtectedRoute>

    ), children: [{
      index: true, element: <Template/>
    }, {
      path: ':id/builder', element: (
      <TemplateContainer>
        <FormBuilder/>
      </TemplateContainer>
      )
    }, {
      path: ':id/overview', element: (<TemplateContainer>
        <Overview/>
      </TemplateContainer>)
    }, {
      path: ':id/setting', element: (<TemplateContainer>
        <Setting/>
      </TemplateContainer>)
    }, {
      path: ':id/submissions', element: (<TemplateContainer>
        <Submissions/>
      </TemplateContainer>)
    }, {
      path: ':id/integration', element: (<TemplateContainer>
        <Integration/>
      </TemplateContainer>)
    },]
  }, {
    path: '/template/:id/public', element: <FormRender/>
  }, {
    path: '/pdf/:submissionId', element: <SubmissionView/>
  }, {
    path: '/template/:id/submission', element: <SuccessState/>
  }, {
    path: '/submission/:submissionId/view', element: <SubmissionView/>
  }, {
    path: '/kiosk', element: (<ProtectedRoute>
      <Kiosk/>
    </ProtectedRoute>)
  }, {
    path: '/kiosk-preview/:id', element: (<SplashScreen/>)
  }, {
    path: 'signed', element: (<ProtectedRoute>
      <SignedWaivers/>
    </ProtectedRoute>)
  }, {
    path: '/management', element: (<ProtectedRoute>
      <Outlet/>
    </ProtectedRoute>), children: [{
      index: true, element: <Management/>
    }, {
      path: 'team/:id', element: <ManagementTeam/>
    }, {
      path: 'team/:id/user/create', element: <CreateTeam/>
    }, {
      path: 'team/create', element: <ManagementTeam/>
    }]
  }, {
    path: '/admin/preview', element: (<Preview/>),
  }, {
    path: '*', element: <NotFound/>
  }])

function App() {
  const dispatch = useDispatch();
  const {pathname} = window.location;
  const currentUser = useSelector(selectCurrentUser);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("token");
  const isAdmin = urlParams.get("isAdmin")
  const isTemplatePath = pathname.includes('template');
  const isPdfPath = pathname.includes('pdf');
  const isKioskPath = pathname.includes('kiosk-preview');
  const isResetPath = pathname.includes('reset-password')
  const isRegisterPath = pathname.includes('register')
  const isResetPasswordPath = pathname.includes('reset-password');

  useEffect(() => {
    //this executes on subdomain load
    if (code) localStorage.setItem("cw-access-token", code);
    if (isAdmin) localStorage.setItem("isAdmin", isAdmin);
    const token = localStorage.getItem("cw-access-token");
    if (token || isTemplatePath || isPdfPath || isResetPasswordPath || isKioskPath || isRegisterPath) {
      if (isEmptyObject(currentUser) && !isTemplatePath && !isPdfPath && !isKioskPath && !isResetPath && !isRegisterPath) {
        dispatch(userProfile(token));
      }
      const redirectTo = (window.location.pathname === "/" || window.location.pathname === "/dashboard") ? "/dashboard" : window.location.pathname + window.location.search;
      router.navigate(redirectTo);
    } else {
      router.navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (<>
    <Toaster position="bottom-center"/>
    <RouterProvider router={router}/>
  </>);
}

export default App;
