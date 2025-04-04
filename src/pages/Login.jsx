import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authSlice'
import { Form } from '../components/Form'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth)
    console.log(token)

    /*useEffect(() => {
        const storedToken = sessionStorage.getItem('token')
        if (storedToken && !token) {
            dispatch(login({ token: storedToken }))
        }
    }, [dispatch, token])*/
    const handleSubmit = async ({ email, password }) => {
        try {
            const response = await fetch(
                'http://localhost:3001/api/v1/user/login',
                {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (response.ok) {
                const data = await response.json()
                const token = data.body.token
                console.log('login', token)
                sessionStorage.setItem('token', token)
                dispatch(login({ token })) // Si la connexion est réussie, on met à jour le store avec les données
                navigate('/profile')
            } else {
                throw new Error('Login failed')
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error)
        }
    }
    return (
        <main className="main bg-dark">
            <Form onSubmit={handleSubmit} />
        </main>
    )
}
