import { handleStateLogin } from "../main.mjs";

export const logInUser = (currentUsername, currentPassword) => {

    const users = JSON.parse(localStorage.getItem('DBTM'));
    const user = users.find(user => user.username === currentUsername);
    console.log(user.image);
    //Regresará un undefined si no lo encuentra lo que equivale a un FALSE
    if (!user || user.username == "") {
        alert("No se encontró el usuario");
        return false;//nota  Hugo, mejorar con expresiones regulares/ comprobaciones a nivel browser
    }

    //Validación de la constraseña + indicativo que inicie sesión
    if (user.password === currentPassword) {
        //Establesco los valores de estado para el login de cada usuario
        handleStateLogin(true, user.username, user.firstName, user.lastName, user.image);
        
        return true;
    }
    return false;
}

