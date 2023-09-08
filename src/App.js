import "./App.css";
import Router from "./Router";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import store from "./features/auth/store";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import { useEffect } from "react";
import { getUser } from "./features/auth/authActions";

function App() {
    useEffect(() => {
        (async() => {
            if (localStorage.jwtToken) {
                // set axios header
                setAuthorizationToken(localStorage.jwtToken);
    
                if (localStorage.userConnected) {
                    await store.dispatch(getUser());
                }
            }
        })();
    }, []);

    return (
        <div className="App">
            <Nav />
            <Router />
            <Footer />
        </div>
    );
}

export default App;
