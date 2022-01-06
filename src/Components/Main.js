import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'

const Main = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const [signUpErrMsg, setSignUpErrMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        reset();
        setShowModal(false);
    };
    const handleShowModal = () => {
        reset();
        setShowModal(true);
    };

    useEffect(() => {
        if (localStorage.getItem("user-info"))
            navigate("/home");
    }, []);

    const login = async () => {

        let item = { username, password };

        let result = await fetch("https://sutt-front-task-one.herokuapp.com/api/v1/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });

        result = await result.json();
        console.log(result);
        if (result.success === true) {
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/home");
        } else {
            setErrMsg(result.message);
        }
    };

    const reset = () => {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordErrMsg("");
        setSignUpErrMsg("");
    };

    const signUp = async () => {

        if (password === confirmPassword) {

            let item = { name, username, email, password };
    
            let result = await fetch("https://sutt-front-task-one.herokuapp.com/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            })
            result = await result.json();
            console.log(result);
            if (result.success === true)
                handleCloseModal();
            else {
                setSignUpErrMsg(result.message);
            }
        } else {
            setPasswordErrMsg("Confirm Password is not same as the password entered.");
        }
        
    };

    return (
        <React.Fragment>
            <Modal className='p-3' show={showModal} onHide={handleCloseModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body className='m-3'>
                    <form>
                        <div className='row'>
                            <label for="name" className='col-form-label'>
                                Name <span className='text-danger'>*</span>
                            </label>
                            <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='row'>
                            <label for="username" className='col-form-label'>
                                Username <span className='text-danger'>*</span>
                            </label>
                            <input type="text" className="form-control" id="username" name="username" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='row'>
                            <label for="email" className='col-form-label'>
                                Email <span className='text-danger'>*</span>
                            </label>
                            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='row'>
                            <label for="password" className='col-form-label'>
                                Password <span className='text-danger'>*</span>
                            </label>
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='row'>
                            <label for="password" className='col-form-label'>
                                Confirm Password <span className='text-danger'>*</span>
                            </label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            <div className='row text-danger'>
                                {passwordErrMsg}
                            </div>
                        </div>
                        <div className='row text-danger'>
                            {signUpErrMsg}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={reset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={signUp}>
                        Sign Up
                    </Button>
                </Modal.Footer>
                <div className='m-3 text-danger'>
                    * Required Field
                </div>
            </Modal>
            <div className='m-5'>
                <form className='border border-danger p-5 col-md-6 col-sm-8 col-10 offset-md-3 offset-sm-2 offset-1'>
                    <header className='row'>
                        <h2>Login</h2>
                    </header>
                    <div className='row'>
                        <label for="username" className='col-form-label'>
                            Username
                        </label>
                        <input type="text" className="form-control" id="username" name="username" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='row'>
                        <label for="password" className='col-form-label'>
                            Password
                        </label>
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='row text-danger'>
                        {errMsg}
                    </div>
                    <div className='row m-3 justify-content-center'>
                        <button type='button' className='btn btn-danger m-1 m-sm-3 col-auto' onClick={login} >Login</button>
                        <button type='button' className='btn btn-secondary m-3 col-auto offset-1' onClick={() => reset()} >Reset</button>
                        <button type='button' className='btn btn-primary m-3 col-auto offset-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShowModal} >Sign Up</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Main;
