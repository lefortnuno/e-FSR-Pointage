import axios from "axios";

export default axios.create({
  baseURL: `` + process.env.REACT_APP_SUN_COMPLET_URL + ``,
});
