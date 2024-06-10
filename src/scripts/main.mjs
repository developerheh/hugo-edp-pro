import { getAllRecipes } from "./receipes/getRecipes.mjs";
import { getRecipesByTag } from "./receipes/getByTag.mjs";
import { getAllUsers } from "./Users/getAllUsers.mjs";
import { addUser } from "./Users/addUser.mjs";
import { logInUser } from "./Users/login.mjs";
import { stateLogin } from "./Users/stateLogin.mjs";


getAllUsers();
stateLogin();


let isLoged = JSON.parse(localStorage.getItem('stateLoginTM'));

const $ = selector => document.querySelector(selector)

const $recipes = $('#recetas')
const $btnShowRecetas = $('#show-recetas')
const $selectTag = $('#tag')
const $iniciarSesion = $('#iniciar-sesion')
const $registrarse = $('#registrarse')
const $formRegistro = $('.registro')
const $formInicio = $('.form-inicio')
const $btnFormRegistro = $('#btn-registro')
const $btnFormInicioSesion = $('#btn-iniciar-sesion')
const $home = $('.r-s')
const $btnShowProductNav = $('#show-products')
const $btnShowUsersNav = $('#show-users')
const $btnShowPostsNav = $('#show-posts')
const $btnCerrarSesion = $('#cerrar-sesion')

// ___________FORM REGISTRO__________________

const $regName = $('#reg-name');
const $regSurname = $('#reg-surname');
const $regAge = $('#reg-age');
const $regUserName = $('#reg-username');
const $regPassword = $('#reg-password');

// ___________FORM INICIO (Loggin)____________

const $logInUsername = $('#login-username');
const $logInPassword = $('#login-password');

// ___________Show home_______________________
const showHome = () => {
    //agrego el home
    document.querySelector('#home').innerHTML = `
     <img src=${isLoged.user.image} alt=${isLoged.username}>
             <h1>Welcome ${isLoged.user.firstName} ${isLoged.user.lastName}</h1>
     `
    document.querySelector('#home').classList.remove('ocultar');
}
// ___________Erase Welcome_______________________
const showPersonal = () => {
    document.querySelector('#home').innerHTML = `
     `
}
// ___________Eventos_________________________

$registrarse.addEventListener('click', () => {
    $formInicio.classList.add('ocultar')
    $formRegistro.classList.remove('ocultar')
})

$iniciarSesion.addEventListener('click', () => {
    $formInicio.classList.remove('ocultar')
    $formRegistro.classList.add('ocultar')
})

$btnShowRecetas.addEventListener('click', () => {
    getAllRecipes();
    $recipes.classList.remove('ocultar'); //Habilita mostrar las "cards" de resetas en pantalla
    showPersonal();
})

$selectTag.addEventListener('change', (e) => {
    getRecipesByTag(e.target.value)
})

$btnFormRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    addUser($regName.value, $regSurname.value, $regAge.value, $regUserName.value, $regPassword.value);

    alert('Registro hecho')
    $formInicio.classList.remove('ocultar')
    $formRegistro.classList.add('ocultar')
})

$btnFormInicioSesion.addEventListener('click', (e) => {
    e.preventDefault()

    const resLogin = logInUser($logInUsername.value, $logInPassword.value);

    if (resLogin) {
        showHome();
        $iniciarSesion.classList.add('ocultar')
        $registrarse.classList.add('ocultar')
        $formInicio.classList.add('ocultar')
        $home.classList.remove('ocultar')

        $btnCerrarSesion.classList.remove('ocultar')
        $btnShowPostsNav.classList.remove('ocultar')
        $btnShowProductNav.classList.remove('ocultar')
        $btnShowRecetas.classList.remove('ocultar')
        $btnShowUsersNav.classList.remove('ocultar')

        $logInUsername.value = "";
        $logInPassword.value = "";
    } else {
        alert("Contraseña o Usuario inválido");
    }

})

$btnCerrarSesion.addEventListener('click', () => {
    handleStateLogin();
    $iniciarSesion.classList.remove('ocultar')
    $registrarse.classList.remove('ocultar')
    $formInicio.classList.remove('ocultar')
    $home.classList.add('ocultar')

    $btnCerrarSesion.classList.add('ocultar')
    $btnShowPostsNav.classList.add('ocultar')
    $btnShowProductNav.classList.add('ocultar')
    $btnShowRecetas.classList.add('ocultar')
    $btnShowUsersNav.classList.add('ocultar')
})

export function handleStateLogin(state = false, username = "", firstName = "", lastName = "", image = "") {

    isLoged.state = state;
    isLoged.user.username = username;
    isLoged.user.firstName = firstName;
    isLoged.user.lastName = lastName;
    isLoged.user.image = image;

    localStorage.setItem('stateLoginTM', JSON.stringify(isLoged));

}
