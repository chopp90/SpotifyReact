
// TODO <a href=....> ?
async function onClick () {
  window.location.href = 'http://localhost:3000/authenticate'
}

function Login() {

  return (
    <>
    <div>
      <button onClick={onClick}>
        Authenticate
      </button>
    </div>
    </>
  )
}

export default Login