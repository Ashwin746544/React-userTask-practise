import { Component } from 'react';
import './NewUser.css';
import Button from '../Button/Button';
import InputElement from '../InputElement/InputElement';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
class NewUser extends Component {
  state = {
    userData: {
      name: {
        tag: 'input',
        type: 'text',
        placeholder: "Enter Name",
        value: '',
        invalid: false,
        validationMessage: "it should be more than 5 character long!"
      },
      email: {
        tag: 'input',
        type: 'email',
        placeholder: "Enter Email",
        value: '',
        invalid: false,
        validationMessage: "email is not valid!"
      },
      password: {
        tag: 'input',
        type: 'password',
        placeholder: "Enter Password",
        value: '',
        invalid: false,
        validationMessage: "it should be more than 8 character long and contain 1 special character,1 digit!"
      },
      phone: {
        tag: 'input',
        type: 'number',
        placeholder: "Enter Phone",
        value: '',
        invalid: false,
        validationMessage: "number is not valid!"
      },
      address: {
        tag: 'textarea',
        type: null,
        placeholder: "Enter Address",
        value: '',
        invalid: false,
        validationMessage: "it should be greater than 20 character!"
      }
    },
    isFormValid: false,
    editMode: false,
    isLoading: false
  }
  componentDidMount() {
    console.log("[NewUser] componentDidMount");
    if (this.props.match.url == "/edit-user") {
      const updatedUserData = { ...this.state.userData };
      const parsedQueryString = new URLSearchParams(this.props.location.search);
      let editUserId;
      for (let param of parsedQueryString.entries()) {
        if (param[0] == "id") {
          editUserId = param[1];
        } else {
          updatedUserData[param[0]] = { ...updatedUserData[param[0]], value: param[1] }
        }
      }
      this.setState({ userData: updatedUserData, editMode: true, editUserId: editUserId });
    }
    // console.log(this.props);
  }
  submitFormHandler = (event) => {
    event.preventDefault();
    const currentUser = {};
    for (let key in this.state.userData) {
      currentUser[key] = this.state.userData[key].value;
    }
    // existingUsers.push(currentUser);
    console.log("form submitted", currentUser);
    this.setState({ isLoading: true });
    if (this.state.editMode) {
      axios.put("/users/" + this.state.editUserId + ".json", currentUser).then(
        res => {
          console.log("User Edited", res.data);
          this.setState({ isLoading: false });
          this.props.history.push("/");
        }
      ).catch(error => {
        console.log('Error Ocuured during Editing', error);
        this.setState({ isLoading: false });
      }
      );
    } else {
      axios.post("/users.json", currentUser).then(
        res => {
          console.log("User added", res.data);
          this.setState({ isLoading: false });
          this.props.history.push("/");
        }
      ).catch(error => {
        console.log('Error Ocuured during Adding', error);
        this.setState({ isLoading: false });
      }
      );
    }

  }
  valueChangeHandler = (event) => {
    const currentInput = event.target;
    const currentInputValue = event.target.value.trim();
    let isInvalid = false;
    switch (currentInput.name) {
      case "name":
        isInvalid = currentInputValue.length < 6;
        break;
      case "email":
        console.log("email checked");
        isInvalid = !currentInputValue.includes("@") || !currentInputValue.includes(".") || !currentInputValue.endsWith("gmail.com");
        break;
      case "password":
        isInvalid = currentInputValue.length < 8;
        break;
      case "phone":
        isInvalid = currentInputValue.length !== 10;
        break;
      case "address":
        isInvalid = currentInputValue.length < 20;
        break;
      default:
        isInvalid = false;
    }
    const updatedUserData = { ...this.state.userData };
    const updatedInputData = { ...updatedUserData[currentInput.name] };
    updatedInputData.value = currentInput.value;
    updatedInputData.invalid = isInvalid;
    updatedUserData[currentInput.name] = updatedInputData;
    console.log(updatedUserData);
    this.setState({ userData: updatedUserData }, this.checkFormValidity);
  }
  checkFormValidity = () => {
    let formValidity = true;
    document.querySelectorAll(".myInput").forEach(el => {
      console.log(el.value);
      if (el.classList.contains('invalidInput') || el.value.trim() == '') {
        formValidity = false;
      }
    });
    console.log('form  is valid' + formValidity);
    this.setState({ isFormValid: formValidity });
  }
  render() {
    console.log("[NewUser] Render");
    const elements = [];
    const formData = this.state.userData;
    for (let key in formData) {
      elements.push(<InputElement
        key={key}
        tag={formData[key].tag}
        type={formData[key].type}
        label={key} placeholder={formData[key].placeholder}
        value={formData[key].value} invalid={formData[key].invalid}
        validationMessage={formData[key].validationMessage}
        clicked={this.valueChangeHandler} />);
    }
    // let isButtonDisabled = this.shouldFormDisabled();
    // console.log(isButtonDisabled);
    return (
      <form className="NewUser">
        <h1 style={{ textAlign: "center" }}>Enter User Details</h1>
        {elements}
        <div style={{ textAlign: "center" }}>
          <Button type="Success"
            clicked={this.submitFormHandler}
            disabled={!this.state.isFormValid}
          >{this.state.isLoading ? <Spinner buttonSize /> : (this.state.editMode ? "Edit User" : "Add User")}</Button>
        </div>
      </form>
    );
  }
}

export default NewUser;