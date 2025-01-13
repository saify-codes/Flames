import axios from "axios";
import { WP_BASE_URI } from "@env"

export default function () {
    axios.defaults.baseURL = WP_BASE_URI

    //Jugar to bypass <site requires Javascript to work> because I am broke to afford a paid hosting 
    axios.defaults.headers.common = {
        "Cookie": "wordpress_logged_in_0a578a2f962e2383c058122e65ed211f=admin%7C1736956695%7Czb3OhgLTjhTyIWEX9DOZebPaF3e3y9wxGZNm72NVudL%7C8853d3237b30ab60e04c77f1a199ad0d6e2efbc128c0c570945dfc34ae0b3b0f; wp-settings-time-1=1736792563; __test=6026da205b33557140f85ba28df79d6d",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    }
}