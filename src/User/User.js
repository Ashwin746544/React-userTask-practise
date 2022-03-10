import './User.css';
import Button from '../Button/Button';
const user = (props) => {
  return (
    <div className='User'>
      <p><strong>Name: </strong> Chaudhary Ashwin</p>
      <p><strong>Email: </strong> test123@gmail.com</p>
      <p><strong>password: </strong> test1234</p>
      <p><strong>phone: </strong> 8876786876</p>
      <p><strong>Address: </strong> fjhf fhjhsfh fsdh fsdfhj dff fsf </p>
      <Button type="Success">Edit</Button>
      <Button type="Danger">Delete</Button>
    </div>
  );
}

export default user;