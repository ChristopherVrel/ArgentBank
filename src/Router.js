import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/Error/Error";

const Router = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path={"/profile" } element={<Profile />} /> 
            <Route path="/login" element={(user?.isLogged) ? <Navigate to="/" /> : <Login /> } />
            <Route path="*" element={<Error />}/> 
        </Routes>
    )
}
  
export default Router;