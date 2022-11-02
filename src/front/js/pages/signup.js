import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState ("");
	const [password, setPassword] = useState ("");
	let navigate = useNavigate();

	
	const handleClick = () => {
		actions.register(email, password);
	}

	useEffect(() => {
		if (store.flag) navigate("/");
	}, [store.flag])

	return (
		<div className=" card container text-center mt-5">
			<h1 style={{ color: "#ffeba7" }}> página de Registro</h1>
            <input type="text" className="inputs" placeholder="email" value={email} onChange={(e) => {
              setEmail(e.target.value);
			  
            }} />
            <input type="text" placeholder="password" value={password} onChange={(e) => {
              setPassword(e.target.value);
			  
            }} />
            <button onClick={handleClick}style={{ color: "red" }}>Registro</button>
            <div>
              <Link to={'/'} className="btn btn-primary btn-lg mt-3 ms-3" style={{ color: "#ffeba7" }}>Volver</Link>
            </div>
 
		</div>
	);
};