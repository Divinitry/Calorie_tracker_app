import MultiSignUpForm from "../../components/signup_login/MultiSignUpForm"

const AuthScreen = () => {
    return(
        // create a base template to say "sign up or log in" and if they click sign up route them to multi sign up form, if they click login, then send them to login page
        <MultiSignUpForm/>
    )
}

export default AuthScreen
