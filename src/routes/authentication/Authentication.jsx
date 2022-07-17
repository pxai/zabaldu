import SignInForm from "../../components/sign-in/SignIn";
import SignUpForm from "../../components/sign-up/SignUp";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;