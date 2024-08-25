
import Cookies from "js-cookie"

export const handleSaveCookies = () => {

    const saveCookies = Cookies.get("saveCookies")
    
    if (!saveCookies) {
        Cookies.set("saveCookies", "4", { expires: 1, path: "/", sameSite: "strict" })
    }

    switch (saveCookies) {
        case "4":
            Cookies.set("saveCookies", "3", { expires: 1, path: "/", sameSite: "strict" });
            break;
        case "3":
            Cookies.set("saveCookies", "2", { expires: 1, path: "/", sameSite: "strict" });
            break;
        case "2":
            Cookies.set("saveCookies", "1", { expires: 1, path: "/", sameSite: "strict" });
            break;
        case "1":
            Cookies.set("saveCookies", "0", { expires: 1, path: "/", sameSite: "strict" });
            break;
        default:
            console.log("saveCookies has an unexpected value or is not set");
    }
    
    
}


// handling cookies for shared cards
export const handleShareCookies = () => {


    const cardId = Cookies.get("cardId")
    if(!cardId) {
        console.log("skip cookie handler")
        return;
    }

    const allCookies = Cookies.get()

    const filterCardCookies = Object.keys(allCookies)
    .filter(cookieName => cookieName.startsWith("shareCookie_"))

    filterCardCookies.forEach(cookie => Cookies.remove(cookie, { path: "/" }))

    Cookies.remove("cardId")

    console.log("deleting cookies")
}

