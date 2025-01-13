import axios from "axios";
import { WP_BASE_URI } from "@env"

export default function () {
    axios.defaults.baseURL = WP_BASE_URI
}