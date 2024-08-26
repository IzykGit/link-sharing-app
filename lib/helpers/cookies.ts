
import Cookies from "js-cookie"

export const handleSaveCookies = () => {

    const initialExpireTime = Cookies.get("initialExpireSaveTime")
    const saveCookies = Cookies.get("saveCookies")

    if (!saveCookies) {
        const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day in the future
        Cookies.set("saveCookies", "4", { expires: oneDayFromNow, path: "/", sameSite: "strict" });
        Cookies.set("initialExpireSaveTime", oneDayFromNow.getTime().toString(), { expires: oneDayFromNow, path: "/", sameSite: "strict" });
    }
    else {

        // calculate the remaining time until the initial expire time
        const currentTime = Date.now();
        const remainingTime = Number(initialExpireTime) - currentTime;
        const remainingDays = remainingTime / (24 * 60 * 60 * 1000); // converting milliseconds to days
    
        // checking that the remaining time is not negative
        switch (saveCookies) {
            case "4":
                Cookies.set("saveCookies", "3", { expires: remainingDays, path: "/", sameSite: "strict" });
                break;
            case "3":
                Cookies.set("saveCookies", "2", { expires: remainingDays, path: "/", sameSite: "strict" });
                break;
            case "2":
                Cookies.set("saveCookies", "1", { expires: remainingDays, path: "/", sameSite: "strict" });
                break;
            case "1":
                Cookies.set("saveCookies", "0", { expires: remainingDays, path: "/", sameSite: "strict" });
                break;
            default:
                console.log("No more saves left");
        }

    }

}



export const handleShareCookies = () => {
    const initialExpireTime = Cookies.get("initialExpireShareTime")
    const shareCookies = Cookies.get("shareCookies")

    if (!shareCookies) {
        const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day in the future
        Cookies.set("shareCookies", "2", { expires: oneDayFromNow, path: "/", sameSite: "strict" });
        Cookies.set("initialExpireShareTime", oneDayFromNow.getTime().toString(), { expires: oneDayFromNow, path: "/", sameSite: "strict" });
    }
    else {

        // calculate the remaining time until the initial expire time
        const currentTime = Date.now(); 
        const remainingTime = Number(initialExpireTime) - currentTime;
        const remainingDays = remainingTime / (24 * 60 * 60 * 1000); // converting milliseconds to days
    
        // checking that the remaining time is not negative
        switch (shareCookies) {
            case "2":
                Cookies.set("shareCookies", "1", { expires: remainingDays, path: "/", sameSite: "strict" });
                break;
            case "1":
                Cookies.set("shareCookies", "0", { expires: remainingDays, path: "/", sameSite: "strict" });
                break;
            default:
                console.log("No more shares left");
        }

    }
}
    



// handling cookies for shared cards
export const handleCardCookies = () => {


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

