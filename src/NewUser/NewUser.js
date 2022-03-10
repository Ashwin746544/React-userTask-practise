
class NewUser extends Component {
  render() {
    return (
      <form>
        <div>
          <label for="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Enter Name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter Email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter Password" />
        </div>
        <div>
          <label for="phone">Phone</label>
          <input type="number" name="phone" id="phone" placeholder="Enter Phone" />
        </div>
        <div>
          <label for="address">Address</label>
          <textarea name="address" id="address" placeholder="Enter Address" />
        </div>
      </form>
    );
  }
} 