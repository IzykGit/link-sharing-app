
import Cookies from "js-cookie"

export const handleSaveCookies = () => {

    // grabbing save cookies and the initil expiry time
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
    
        // updaing the cookies for how many saves the user has left
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

    // grabbing save cookies and the initil expiry time
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
    
        // updaing the cookies for how many shares the user has left
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
// deleting previous cookies so no data overlaps when user generates a new card
export const handleCardCookies = () => {

    
    const cardId = Cookies.get("cardId")

    // if no card then skip
    if(!cardId) {
        console.log("skip cookie handler")
        return;
    }

    // getting all cookies
    const allCookies = Cookies.get()


    // finding all cookies that start with "shareCookie_"
    const filterCardCookies = Object.keys(allCookies)
    .filter(cookieName => cookieName.startsWith("shareCookie_"))

    // removing all share cookies
    filterCardCookies.forEach(cookie => Cookies.remove(cookie, { path: "/" }))


    // removing preview card id
    Cookies.remove("cardId")

    console.log("deleting cookies")
}




// confirming users consent to cookies
export const confirmCookies = () => {
    
    const confirmCookie = Cookies.get("confirmCookie")

    if(!confirmCookie) {
        Cookies.set("confirmCookie", "User has consented to cookie usage", { expires: 30, path: "/", sameSite: "strict"})
        return;
    }
}

