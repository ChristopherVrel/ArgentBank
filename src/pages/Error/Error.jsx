import "./Error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <main className="main error">
            <h1>404 not found</h1>
            <button onClick={() => navigate("/")} className="sign-in-button">Back home</button>
        </main>
    )
}

export default Error;