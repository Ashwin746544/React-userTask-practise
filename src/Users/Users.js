import { Component } from "react";
import User from '../User/User';
import "./Users.css";
import Button from '../Button/Button';

class Users extends Component {
  render() {
    return (
      <div className="Users">
        <h1>Users</h1>
        <div>
          <Button type='Success'>Add User</Button>
          <Button type='Danger'>Delete Users</Button>
        </div>
        <User />
        <User />
      </div>
    );
  }
}

export default Users;