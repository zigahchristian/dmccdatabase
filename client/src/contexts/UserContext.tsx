import React, {FC, createContext, useState} from "react"

interface UserContextType {
    name:string;
    email: string
    updateUser: (name:string, email:string) => void
}

const UserContext = createContext<UserContextType | null>(null)

const UserProvider: FC = ({children}: any) => {
    const [user, setUser] = useState<UserContextType>({
        name:'Christian',
        email: 'christian@mail.com',
        updateUser: (name:string, email:string) => void
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider