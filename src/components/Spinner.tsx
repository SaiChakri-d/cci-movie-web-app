import spinner from "../assets/spinner.svg";
import "../styles/Spinner.css"

const Spinner = () => {
  return (
    <div className="spinner">
      <div>
        <img src={spinner} alt="Loading..." className="spinner-img" />
      </div>
    </div>
  );
}

export default Spinner;