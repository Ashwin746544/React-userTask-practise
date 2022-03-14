import { Component } from "react";
import User from '../User/User';
import "./Users.css";
import Button from '../Button/Button';
import axios from 'axios';
import Axiliary from "../Axiliary/Auxiliary";
import Spinner from '../Spinner/Spinner';

class Users extends Component {
  state = {
    users: [],
    isLoading: false
  }
  addUserHandler = () => {
    this.props.history.push("/new-user");
  }
  navigateToEditUser = (user) => {
    let queryString = [];
    for (let key in user) {
      queryString.push(encodeURIComponent(key) + "=" + encodeURIComponent(user[key]));
    }
    this.props.history.push({
      pathname: "/edit-user",
      search: "?" + queryString.join('&')
    });
  }
  deleteUserHandler = (id) => {
    this.setState({ isLoading: true });
    axios.delete("/users/" + id + ".json").then(
      res => {
        console.log(res.data);
        const deletedUserIndex = this.state.users.findIndex(user => user.id == id);
        console.log(deletedUserIndex);
        let users = [...this.state.users];
        users.splice(deletedUserIndex, 1);
        this.setState({ users: users, isLoading: false });
      }
    ).catch(error => {
      console.log("Error during Delete");
      this.setState({ isLoading: false })
    })
  }
  deleteAllUserHandler = () => {
    this.setState({ isLoading: true });
    axios.delete("/users.json").then(
      res => {
        console.log("delete response", res);
        this.setState({ users: [], isLoading: false });
      }
    ).catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    }
    );
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    console.log("[Users] componentDidMount")
    axios.get('/users.json').then(
      res => {
        console.log("Users", res.data);
        const users = [];
        for (let key in res.data) {
          users.push({ ...res.data[key], id: key });
        }
        this.setState({ users: users, isLoading: false });
      }
    ).catch(error => console.log('error during getting users', error))
  }
  componentWillUpdate() {
    console.log("[Users] componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("[Users] componentDidUpdate");
  }
  render() {
    console.log("[Users] Render");
    const usersAvailable = this.state.users.length > 0;
    const users = this.state.users.map(user => {
      return <User key={user.id} user={user} deleteHandler={() => this.deleteUserHandler(user.id)} editHandler={() => this.navigateToEditUser(user)} />
    });
    return (
      <div className="Users">
        <h1 className="title">Users</h1>
        {this.state.isLoading ? <Spinner /> : <Axiliary>
          <div>
            <Button type='Success' clicked={this.addUserHandler}>Add User</Button>
            {usersAvailable ? <Button type='Danger' clicked={this.deleteAllUserHandler}>Delete Users</Button> : null}
          </div>
          <div id="line"></div>
          {usersAvailable ? users : <h1>No User Available!</h1>}
        </Axiliary>}
      </div>
    );
  }
}

export default Users;