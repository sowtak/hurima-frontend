import { GoogleLogin } from "@react-oauth/google"

const Register = () => {

  const responseMessage = () => {
    console.log("success");
  }

  const errorMessage = () => {
    console.log("error");
  }

  return (
      <div>
        <h2>Sign in with Google</h2>
        <br></br>
        <br></br>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
      </div>
  )
}

export default Register