import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: role = {},
        isLoading: roleLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            console.log('hello', res);
            return res.data.role;
        },
    });

    return {
        role,
        roleLoading: authLoading || roleLoading,
        refetch,
    };
};

export default useUserRole;
