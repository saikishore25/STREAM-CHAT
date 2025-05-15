import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../src/lib/api";
import { useNavigate } from "react-router-dom";

const useLogout = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate()
    const {mutate: logoutMutation, isPending, error } = useMutation({

        mutationFn: logout,
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            navigate("/")
        },
    });

    return { logoutMutation, isPending, error };
};
export default useLogout;