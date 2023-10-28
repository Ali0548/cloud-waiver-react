import {createBrowserRouter, Outlet, RouterProvider,} from "react-router-dom";
import Home from "./pages/dashboard/Home.jsx";
import Login from "./pages/auth/Login";
import {Toaster} from "react-hot-toast";
import Register from "./pages/register/Register.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/reset-password/ResetPassword.jsx";
import VerifyMail from "./pages/verify-mail/VerifyMail.jsx";
import VerificationClient from "./pages/verify-account/VerificationClient.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Settings from "./pages/settings/Settings.jsx";
import UpdatePassword from "./pages/updatePassword/updatePassword.jsx";
import Billing from "./pages/billing/Billing.jsx";
import {useEffect} from "react";
import Integrations from "./pages/integrations/Integrations.jsx";
import Customer from "./pages/customers/Customer.jsx";
import UpdateCustomer from "./pages/updateCustomer/UpdateCustomer.jsx";
import Management from "./pages/management/Management.jsx";
import CustomerList from "./pages/customerList/CustomerList.jsx";
import ManagementTeam from "./pages/managementTeam/ManagementTeam.jsx";
import CreateTeam from "./pages/createTeam/CreateTeam.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "./redux/user/userThunk.js";
import {selectCurrentUser} from "./redux/user/userSlice.js";
import {isEmptyObject} from "./utils/generalFunctions.js";
import SelectDomain from "./pages/selectDomain/SelectDomain.jsx";
import Kiosk from "./pages/kiosk/Kiosk.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Login/>
    )
  }, {
    path: '/domain/select',
    element: (
      <SelectDomain/>
    )
  }, {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    )
  }, {
    path: '/register',
    element: (
      <Register/>
    )
  }, {
    path: '/forgot-password',
    element: (
      <ForgotPassword/>
    )
  }, {
    path: '/reset-password/:id',
    element: (
      <ResetPassword/>
    )
  }, {
    path: '/verify-mail/:hashId/:id',
    element: (
      <VerifyMail/>
    )
  }, {
    path: '/verify-account/:hashId/:id',
    element: (
      <VerificationClient/>
    )
  }, {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Settings/>
      }, {
        path: 'integrations',
        element: <Integrations/>
      }
    ]
  }, {
    path: '/settings/password',
    element: (
      <ProtectedRoute>
        <UpdatePassword/>
      </ProtectedRoute>
    )
  }, {
    path: '/billing',
    element: (
      <ProtectedRoute>
        <Billing/>
      </ProtectedRoute>
    )
  }, {
    path: '/customers',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Customer/>
      }, {
        path: ':id/edit',
        element: <UpdateCustomer/>
      }, {
        path: ':id',
        element: <CustomerList/>
      }
    ]
  },
  // {
  //   path: '/template',
  //   element: (
  //     <ProtectedRoute>
  //       <Outlet/>
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: <Template/>
  //     }
  //   ]
  // },
  {
    path:'/kiosk',
    element:(
      <ProtectedRoute>
        <Kiosk/>
      </ProtectedRoute>
    )
  },
  {
    path: '/management',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Management/>
      }, {
        path: 'team/:id',
        element: <ManagementTeam/>
      }, {
        path: 'team/:id/user/create',
        element: <CreateTeam/>
      }, {
        path: 'team/create',
        element: <ManagementTeam/>
      }
    ]
  }
])

function App() {
  const {pathname} = window.location;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser)

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("token");
  //   if (code) {
  //     localStorage.setItem("cw-access-token", code);
  //   }
  //   const token = localStorage.getItem("cw-access-token");
  //
  //   if (token && token !== "null") {
  //     if (isEmptyObject(currentUser)) {
  //       dispatch(userProfile(token))
  //     }
  //     if ((pathname === "/" || pathname === "/dashboard"))
  //       router.navigate("/dashboard");
  //     else if (pathname !== "/dashboard")
  //       router.navigate(pathname);
  //   }
  //   else {
  //     router.navigate("/");
  //   }
  // }, []);

  return (
    <>
      <Toaster position="bottom-center"/>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/">
//       <Route index element={<Login/>}/>
//       <Route path="/dashboard" element={<Home/>}/>
//       <Route path="/register" element={<Home/>}/>
//     </Route>
//   )
// );
