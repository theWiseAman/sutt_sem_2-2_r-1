import React, { useState } from 'react';

import "./Home.scss";
import NavBar from "../NavBar/NavBar";

const Home = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    let user = JSON.parse(localStorage.getItem("user-info"));

    return (
        <React.Fragment>
            <NavBar user={user} />
            <div className="home">
                <h2>Dashboard</h2>
                Id: {id}
                <br />
                Name: {name}
                <br />
                Username: {username}
                <br />
                Email: {email}
                <br />
                Created At: {createdAt}
                <br />
                Updated At: {updatedAt}
                <br />
            </div>
        </React.Fragment>
    )
}

export default Home;
