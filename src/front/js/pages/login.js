import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  let navigate = useNavigate();

  //Función para limpiar el token del store
  const logOut = () => {
    actions.cleanStore();
  }

  const handleClick = () => {
   actions.login(email, password);
   setEmail("");
   setPassword("");
  };

  //Una vez logado, si es correcto el token, nos lleva a nuestra página privada
  if(store.user.token && store.user.token != "" && store.user.token != undefined) { navigate("/private") }

  return (
    <div className="card text-center">
      <h1 style={{ color: "#ffeba7" }}>Pagina principal</h1>
        {
          (store.user.token && store.user.token != "" && store.user.token != undefined) ?
           ( 
           <div>
            <p style={{ color: "#ffeba7" }}>token: {store.user.token}</p>
            <Link to={'/'} className="btn btn-primary btn-lg mt-3 ms-3" onClick={logOut}>Cerrar sesion</Link>
            <Link to={'/private'} className="btn btn-primary btn-lg mt-3 ms-3">Página privada</Link>
           </div>
           ) :
           ( 
              <div>
                <input autoFocus type="text" placeholder="email" value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }}  />
                <input type="password" placeholder="password" value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} />
                <button onClick={handleClick}>Login</button>
                <div>
                  <Link to={'/signup'} className="btn btn-primary btn-lg mt-3 ms-3">Registro</Link>
                </div>
              </div>
          )
        }
    </div>
  );
};


{/* <div className="mainContainer">
<div className="form d-flex justify-content-center">

  {store.user.token &&
  store.user.token != "" &&
  store.user.token != undefined ? (
    //Si está logado
    <div className="">
      {store.user.role == "admin" ? (            <div className="card">
        <h4 className="title" style={{ color: "#ffeba7" }}>
          Bienvenido {store.user.userName}
          
        </h4>
        
        <p style={{ color: "white" }}>
        Estas logueado como Administrador
     </p>
                       <Link
                       to={"/admin-home"}
                       className="btn btn-primary btn-lg mt-3 ms-3"
                     > 
                     <i className="fa-solid fa-toolbox fa-xl me-3"></i>
                       Administrador
                     </Link>
                                   <Link to={"/"} className="btn btn-primary btn-lg mt-3 ms-3">
                                   <i className="fa-solid fa-house fa-xl me-3"></i>
                                   Volver a inicio
                                 </Link>
      </div>) : (            <div className="card">
        <h4 className="title" style={{ color: "#ffeba7" }}>
          Bienvenido {store.user.userName}
          
        </h4>
        
          <p style={{ color: "white" }}>
          Esta es tu zona privada, no olvides acceder a la encuesta
         para rellenar tus datos
       </p>
        


          <Link
            to={"/usuario"}
            className="btn btn-primary btn-lg mt-3 ms-3"
          >
            <i className="fa-solid fa-dumbbell fa-xl me-3"></i>
            Zona Usuario
          </Link>
          <Link to={"/survey"} className="btn btn-primary btn-lg mt-3 ms-3">
          <i className="fa-solid fa-square-poll-vertical fa-xl me-3"></i>
          Realizar encuesta
        </Link>
        
        <Link to={"/"} className="btn btn-primary btn-lg mt-3 ms-3">
          <i className="fa-solid fa-house fa-xl me-3"></i>
          Volver a inicio
        </Link>
      </div>)}





    </div>
  ) : (
    // Si NO está logado
    <div className="card">
      <h4 className="title" style={{ color: "#ffeba7" }}>
        Ingreso
      </h4>

      <Formik
        initialValues={{
          name: "",
          pass: "",
        }}
        validate={(values) => {
          let errors = {};

          // validación del input email
          if (!values.email) {
            errors.email = "Por favor ingresa un correo";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email =
              "El correo sólo puede contener letras, números, puntos, guiones y el guión bajo";
          }

          // validación del input password
          if (!values.pass) {
            errors.pass = "La contraseña debe tener de 4 a 8 caracteres y debe contener números, letras minúsculas y mayúsculas";
          } else if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{4,8})/.test(values.pass)
          ) {
            errors.pass =
              "La contraseña debe tener de 4 a 8 caracteres y debe contener números, letras minúsculas y mayúsculas";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          actions.login(values.email, values.pass);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="field ">
              <span style={{ color: "#ffeba7" }}>
                <i className="fa-solid fa-at"></i>
              </span>

              <Field
                className="input-field"
                placeholder="email"
                type="text"
                name="email"
              />
            </div>

            <ErrorMessage
              name="email"
              component={() => (
                <div className="error">{errors.email}</div>
              )}
            />

            <div className="field ">
              <span style={{ color: "#ffeba7" }}>
                <i className="fa-solid fa-lock"></i>
              </span>

              <Field
                className="input-field"
                placeholder="password"
                type="password"
                name="pass"
              />
            </div>

            <ErrorMessage
              name="pass"
              component={() => <div className="error">{errors.pass}</div>}
            />

            <div className="buttons">
              <Link to={"/"}>
                <button className="btn ms-3">Volver</button>
              </Link>
              <button type="submit" className="btn">Ingresar</button>

              <Link to={'/signup'}><button className="btn ms-3">Registro</button></Link>
            </div>
            
          </Form>
        )}
      </Formik>
      <div>
        <Link to={"/recover-password"} className="btn-link">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  )}
</div>
</div> */}