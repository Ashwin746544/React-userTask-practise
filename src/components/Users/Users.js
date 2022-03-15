import { Component } from "react";
import User from '../User/User';
import "./Users.css";
import Button from '../Button/Button';
import { withRouter } from 'react-router-dom';

function Users(props) {
  const navigateToNewUser = () => {
    console.log(props);
    props.history.push("/new-user");
  }
  const navigateToEditUser = (user) => {
    console.log(props);
    props.history.push({ pathname: '/edit-user', user: user });
  }

  console.log("[Users] Render");
  const usersAvailable = props.users.length > 0;
  const users = props.users.map(user => {
    return <User
      key={user.name + Math.random()} user={user}
      deleteHandler={() => props.userDeleted(user.phone)}
      editHandler={() => navigateToEditUser(user)} />
  });
  return (
    <div className="Users">
      <h1 className="title">Users</h1>
      <div>
        <Button type='Success' clicked={navigateToNewUser}>Add User</Button>
        {usersAvailable ? <Button type='Danger' clicked={props.allUserDeleted}>Delete Users</Button> : null}
      </div>
      <div id="line"></div>
      {usersAvailable ? users : <h1>No User Available!</h1>}
    </div>
  );
}

export default withRouter(Users);