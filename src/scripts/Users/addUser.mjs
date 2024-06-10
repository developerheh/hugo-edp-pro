// fn que POSTee un usuario
export const addUser = async (firstName,lastName,age,username,password,image="https://cdn-icons-png.flaticon.com/512/149/149071.png") => {

    try {
    const res = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          username,
          password,
          image
        })
      })

      const user = await res.json();
      const listUsers =JSON.parse(localStorage.getItem('DBTM'));
      listUsers.push(user);
      localStorage.setItem('DBTM',JSON.stringify(listUsers));

    } catch (e) {
        console.error(e);
    }

}