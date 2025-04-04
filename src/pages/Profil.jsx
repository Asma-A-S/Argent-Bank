import { Accounts } from '../components/Accounts'
import accountsData from '../data/accountsData'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { EditProfile } from '../components/EditProfile'
export function Profil() {
    const dispatch = useDispatch()
    const { firstName, lastName } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.auth)
    console.log(token)

    useEffect(() => {
        async function fetchUserInfos() {
            try {
                const response = await fetch(
                    'http://localhost:3001/api/v1/user/profile',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = await response.json()
                dispatch(setUser(data.body))
            } catch (error) {
                console.error(error)
            }
        }
        if (token) {
            fetchUserInfos()
        }
    }, [dispatch, token])
    /*  */

    //gérer la modifiction du profil
    const [editing, setEditing] = useState(false)
    function handleEditClick() {
        setEditing(true)
    }
    async function handleSave(newFirstName, newLastName) {
        try {
            console.log('Sending data:', {
                firstName: newFirstName,
                lastName: newLastName,
            })
            const response = await fetch(
                'http://localhost:3001/api/v1/user/profile',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (!response.ok) {
                const errorData = await response.json()
                console.error('API Error:', errorData)
                throw new Error('Échec de la mise à jour du profil')
            }
            const update = await response.json()
            dispatch(setUser(update.body))
            setEditing(false)
        } catch (error) {
            console.error('Erreur lors de la mise à jours: ', error)
        }
    }
    function handleCancel() {
        setEditing(false)
    }
    return (
        <main className={editing ? 'main bg-light' : 'main bg-dark'}>
            {editing ? (
                <EditProfile
                    firstName={firstName}
                    lastName={lastName}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <div className="header">
                    <h1>
                        Welcome back
                        <br />
                        {firstName} {lastName}!
                    </h1>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                </div>
            )}{' '}
            <>
                <h2 className="sr-only">Accounts</h2>
                {accountsData.map((item) => (
                    <Accounts
                        key={item.id}
                        title={item.title}
                        amount={item.amount}
                        description={item.description}
                    />
                ))}
            </>
        </main>
    )
}
