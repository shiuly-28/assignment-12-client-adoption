import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};


