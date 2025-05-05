import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import "./App.css";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RoutesComponent from "./components/RoutesComponent";

import "./i18n";

// import { useSelector } from "react-redux";
// import { PopupProvider } from "./constants/PopupContext";
import { Login } from "./containers/login";
import { Signup } from "./containers/signup";
import { SignupCode } from "./containers/signup-code";
import { SignupPassword } from "./containers/signup-password";
// import Promotions from "./components/Promotions";

function App() {
  const location = useLocation();
  // const navigate = useNavigate();

  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [isSignupPopupVisible, setIsSignupPopupVisible] = useState(false);
  const [isSignupCodePopupVisible, setIsSignupCodePopupVisible] =
    useState(false);
  const [isSignupPasswordPopupVisible, setIsSignupPasswordPopupVisible] =
    useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // const { isLogged } = useSelector(({ auth }) => ({
  //   isLogged: auth.logged,
  // }));

  // const handleLoginClick = () => {
  //   if (isLogged) {
  //     navigate("/app");
  //   } else {
  //     setIsLoginPopupVisible(true);
  //   }
  // };

  // const popupContextValue = {
  //   isLoginPopupVisible,
  //   setIsLoginPopupVisible,
  //   isSignupPopupVisible,
  //   setIsSignupPopupVisible,
  //   isSignupCodePopupVisible,
  //   setIsSignupCodePopupVisible,
  //   isSignupPasswordPopupVisible,
  //   setIsSignupPasswordPopupVisible,
  //   handleLoginClick,
  // };

  return (
    <div className="App">
      {/* <PopupProvider value={popupContextValue}> */}
      <Login
        isVisible={isLoginPopupVisible}
        setIsVisible={setIsLoginPopupVisible}
        setIsSignupPopupVisible={setIsSignupPopupVisible}
      />
      <Signup
        isVisible={isSignupPopupVisible}
        setIsVisible={setIsSignupPopupVisible}
        setIsLoginPopupVisible={setIsLoginPopupVisible}
        setIsSignupCodePopupVisible={setIsSignupCodePopupVisible}
      />
      <SignupCode
        isVisible={isSignupCodePopupVisible}
        setIsVisible={setIsSignupCodePopupVisible}
        setIsSignupPasswordPopupVisible={setIsSignupPasswordPopupVisible}
      />
      <SignupPassword
        isVisible={isSignupPasswordPopupVisible}
        setIsVisible={setIsSignupPasswordPopupVisible}
      />
      
      <Header
        setIsLoginPopupVisible={setIsLoginPopupVisible}
        setIsSignupPopupVisible={setIsSignupPopupVisible}
      />
      <RoutesComponent />
      {/* <Promotions /> */}
      <Footer />
      {/* </PopupProvider> */}
    </div>
  );
}

export default App;
