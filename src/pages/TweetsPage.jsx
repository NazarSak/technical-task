import { useEffect, useState } from 'react';
import { getUser } from 'apiUsers/services';
import { Users } from 'components/users/users';

export const TweetPage = () => {
  const [users, setUsers] = useState([]);

  const usersStorage = JSON.parse(localStorage.getItem('users'));

  useEffect(() => {
    getUser()
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        const formattingUsers = data.map(item => ({
          ...item,
          follow: false,
        }));
        
        setUsers(formattingUsers);
      

        if (usersStorage === null) {
          localStorage.setItem('users', JSON.stringify(formattingUsers));
        }
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line
  }, []);


  return <Users users={usersStorage ?? users} setUsers={setUsers} />

};
