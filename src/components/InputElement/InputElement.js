import './InputElement.css';

const inputElement = (props) => {
  let element;
  let assignedClasses = ['myInput'];
  props.invalid ? assignedClasses.push('invalidInput') : assignedClasses.push('');
  switch (props.tag) {
    case ("input"):
      element = <input className={assignedClasses.join(" ")} value={props.value} type={props.type} name={props.label} id={props.label} placeholder={props.placeholder} onChange={props.clicked} />;
      break;
    case ("textarea"):
      element = <textarea className={assignedClasses.join(" ")} value={props.value} name={props.label} id={props.label} placeholder={props.placeholder} onChange={props.clicked} />;
      break;
    default:
      element = <input className={assignedClasses.join(" ")} value={props.value} type={props.type} name={props.label} id={props.label} placeholder={props.placeholder} onChange={props.clicked} />;
  }
  return (
    <div className='InputElement'>
      <label htmlFor="name">{props.label}</label>
      {element}
      {props.invalid ? <small className='invalid'>{props.validationMessage}</small> : null}
    </div>
  );
}

export default inputElement;