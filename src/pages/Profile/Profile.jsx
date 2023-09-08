import "./Profile.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../../features/auth/authActions";
import store from "../../features/auth/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log(user);

            if (!user?.isLogged) {
                navigate("/");
            }

            if (!firstName && !lastName) {
                setFirstName(user?.firstName);
                setLastName(user?.lastName);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        if(firstName.length > 1 && lastName.length > 1) {
            await store.dispatch(updateUser(firstName, lastName));
        };

        setIsEditing(false);
    }

    return (
        <main className="main bg-dark">
            {
                (user && user?.isLogged) && 
                <>
                    <div className="header">
                        {
                            (!isEditing)
                            ?   <>
                                <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
                                <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                            </>
                            :   <>
                                <h1>Welcome back</h1>
                                <form className="profile-form" onSubmit={handleSubmitUpdate}>
                                    <div className="input-container">
                                        <input type="text" placeholder={user?.firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        <input type="text" placeholder={user?.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="button-container">
                                        <button className="edit-button">Save</button>
                                        <button className="edit-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                            <p className="account-amount">$2,082.79</p>
                            <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                            <p className="account-amount">$10,928.42</p>
                            <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                            <p className="account-amount">$184.30</p>
                            <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                </>
            }
        </main>
    );
}

export default Profile;