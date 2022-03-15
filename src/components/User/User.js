import './User.css';
import Button from '../Button/Button';
// import { withRouter } from 'react-router-dom';
const user = (props) => {
  console.log("[User] Render");
  return (
    <div className='User'>
      <p><strong>Name: </strong> {props.user.name}</p>
      <p><strong>Email: </strong> {props.user.email}</p>
      <p><strong>password: </strong> {props.user.password}</p>
      <p><strong>phone: </strong> {props.user.phone}</p>
      <p><strong>Address: </strong> {props.user.address} </p>
      <Button type="Success" clicked={props.editHandler}>Edit</Button>
      <Button type="Danger" clicked={props.deleteHandler}>Delete</Button>
    </div>
  );
}

// export default withRouter(user);
export default user;