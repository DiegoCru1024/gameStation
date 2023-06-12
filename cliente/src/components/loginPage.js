import Header from "./headerComponent"
import styles from '../css/loginRegister.module.css'
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import axios from "axios"

export default function LoginPage() {
    const navigate = useNavigate()
    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const login = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = 'http://localhost:5000/login'
            const response = await axios.post(url, data)
            console.log('Respuesta:', response)
            localStorage.setItem('user', JSON.stringify(response.data.userData))
            navigate('/')
        } catch (error) {
            setButtonDisabled(false)
            console.log('Error:', error)
            setError(error.response.data.message)
        }
    }

    return (
        <main>
            <Header/>
            <div className={styles.loginContainer}>
                <h1>INICIAR SESIÓN</h1>
                <form className={styles.loginForm} onSubmit={login}>
                    <label>NOMBRE DE USUARIO</label>
                    <input type='text' name='username' value={data.username} onChange={detectarCambio}/>
                    <label>CONTRASEÑA</label>
                    <input type='password' name='password' value={data.password} onChange={detectarCambio}/>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <button type='submit'>Iniciar sesión</button>
                    <Link to='/register'>Registrate aquí</Link>
                </form>
            </div>
        </main>
    )
}