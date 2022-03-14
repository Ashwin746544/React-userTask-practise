import './Spinner.css';
const Spinner = (props) => {
  let style = {};
  if (props.buttonSize) {
    style = {
      height: "13.33px",
      width: "13.33px",
      margin: "0 auto"
    }
  }
  return <div className="loader" style={style} > Loading...</div>;
}

export default Spinner;