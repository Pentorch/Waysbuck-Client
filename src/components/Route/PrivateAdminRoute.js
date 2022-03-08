import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  console.log("TSS", state);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.isLogin === true && state.user.role === "Administrator") {
          return <Component {...props} />;
        } else {
          return <Redirect to="/transaction" />;
        }
      }}
    />
  );
};

export default PrivateAdminRoute;
