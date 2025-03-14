import { Authorize } from "./authorize.js";
import { auth } from "./firebase";

const authorize = Authorize();
authorize.isLoggedIn();