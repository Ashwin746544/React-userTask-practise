import './Button.css';

const button = (props) => {
  const classArray = ["Action-btn"];
  classArray.push(props.type);
  return <button className={classArray.join(" ")}>{props.children}</button>;
}

export default button;