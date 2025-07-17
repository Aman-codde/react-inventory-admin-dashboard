import common from "../../styles/common.module.css";

const ErrorMessage = ({error}) => <div className={common.error}>Error: {error}</div>

export default ErrorMessage;