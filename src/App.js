import './App.css';
import Users from './components/Users/Users';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import NewUser from './components/NewUser/NewUser';
import { Component } from 'react';
let globalUsers = [];
window.addEventListener("unload", () => {
  localStorage.setItem("users", JSON.stringify(globalUsers));
});
class App extends Component {
  state = {
    users: [],
    isLoading: false
  }
  AddUserHandler = (user, history) => {
    const users = [...this.state.users];
    users.push(user);
    console.log("history in app.js", history);
    globalUsers = users;
    this.setState({ users: users }, () => { history.push('/') });
  }
  EditUserHandler = (user, history) => {
    const users = [...this.state.users];
    const index = users.findIndex(u => u.phone == user.phone);
    users[index] = user;
    globalUsers = users;
    this.setState({ users: users }, () => { history.push('/') });
  }
  deleteUserHandler = (phone) => {
    const updatedUsers = [...this.state.users];
    const index = updatedUsers.findIndex(user => user.phone == phone);
    updatedUsers.splice(index, 1);
    globalUsers = updatedUsers;
    this.setState({ users: updatedUsers });
  }
  deleteAllUserHandler = () => {
    console.log("all user deleted");
    globalUsers = [];
    this.setState({ users: [] });
  }
  componentDidMount() {
    // this.setState({ isLoading: true });
    console.log("[App] componentDidMount");
    const users = JSON.parse(localStorage.getItem("users"));
    globalUsers = users;
    this.setState({ users: users });
  }
  componentWillUpdate() {
    console.log("[Users] componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("[Users] componentDidUpdate");
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/new-user' render={(props) => <NewUser userAdded={this.AddUserHandler} {...props} />} />
          <Route path='/edit-user' render={(props) => <NewUser userEdited={this.EditUserHandler} {...props} />} />
          <Route path='/' render={() => <Users
            users={this.state.users}
            isLoading={this.state.isLoading}
            userDeleted={this.deleteUserHandler}
            allUserDeleted={this.deleteAllUserHandler} />} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
