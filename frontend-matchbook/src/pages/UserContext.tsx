import React from 'react';

interface User {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    city_id: number,
  
  }

  const UserContext = React.createContext<User | null>(null);

  // Contexto para la función de actualización de estado
  const UserUpdateContext = React.createContext<(user: User | null) => void>(() => {});
  
  export { UserContext, UserUpdateContext };
