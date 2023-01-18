import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";

import Searcher from "./componets/Searcher/Searchear";
import { getUsers } from "./services/users";
import UserCard from "./containers/UserCard"

function App() {
  const [inputUser, setInputUser] = useState("olarteandres");
  const [userState, setUserState] = useState("inputUser");
  const [notFound, setNotFound] = useState(false)

  const gettingUser = async (user) =>{
    const userResponse = await getUsers(user)

    if(userState === 'olarteandres'){
      localStorage.setItem('olarteandres', userResponse)
    }

    if (userResponse.message === 'Not Found') { 
      const {olarteandres} = localStorage
      setInputUser(olarteandres)
      setNotFound(true)
    }else{
      setUserState(userResponse)
    }
  }
  console.log(userState)

  useEffect(() =>{
    gettingUser(inputUser)
  },[inputUser])

  return (
    <Container
      sx={{
        background: "whitesmoke",
        width: "80vw",
        height: "500px",
        borderRadius: "16px",
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Searcher inputUser={inputUser} setInputUser={setInputUser} />
      <UserCard userState={userState}/>
    </Container>
  );
}

export default App;
