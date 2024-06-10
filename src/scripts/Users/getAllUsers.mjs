// crea una funcion que "fetchee" o traiga todos los usuarios
export const getAllUsers = async () => {
    try {
        if (!localStorage.getItem('DBTM')) {
            const res = await fetch(`https://dummyjson.com/users?limit=0`);
            const { users } = await res.json();
            const listUsers = JSON.stringify(users);
            localStorage.setItem('DBTM', listUsers);
        } 
    } catch (e) {
        console.error(e);
    }

}