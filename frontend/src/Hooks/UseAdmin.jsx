import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import UseAxoisSecure from "./UseAxoisSecure/UseAxoisSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";

const UseAdmin = (props) => {
  const { user } = useContext(AuthContext);
  const axoisSecure = UseAxoisSecure();
  const { data: isadmin } = useQuery({
    queryKey: [user?.email, "isadmin"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/users/${user.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isadmin];
};

export default UseAdmin;
