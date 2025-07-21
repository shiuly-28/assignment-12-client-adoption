// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// function RoleProvider() {
//     const [role, setRole] = useState('');
//     const currentUser = useAuth();
//     const email = currentUser.data?.emai;

//     useEffect(() => {
//         async () => {
//             const res = await api.get(`/role/${email}`)
//             console.log(res.data);
//             setRole(res.data)
//         }
//     }, [currentUser, email])
// }
// export default RoleProvider