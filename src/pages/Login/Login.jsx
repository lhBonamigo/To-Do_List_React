import { useState } from "react"



const Login = () => {

    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");

    console.log(usuario,pass)
    return (
    <div className="body">
      <form className="body">
        <input className="digitadd" placeholder="Usuário" type="text" value={usuario} onChange={(e)=>{setUsuario(e.target.value)}}/>
        <input className="digitadd" placeholder="Senha" type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        <input type="submit" />
        <a>criar conta</a>
      </form>
    </div>
  )
}

export default Login
