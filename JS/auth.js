class Auth {
    constructor(){
        //avoid glimpse of app before log in
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("accessToken");
        this.validateAuth(auth);
    }  

    validateAuth(auth) {
        if(auth == "" || auth == null || auth == "undefined") {
            window.location.replace("/");
        }else{
            document.querySelector("body").style.display = "block"; 
        }
    }

    logOut() {
        localStorage.removeItem("auth");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        window.location.replace("/");
    }
}