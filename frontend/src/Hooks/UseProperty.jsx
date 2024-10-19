import React from "react";
import UseAxoisPublic from "./UseAxoisPublic/UseAxoisPublic";
import { useQuery } from "@tanstack/react-query";

const UseProperty = (props) => {
  const axoisPublic = UseAxoisPublic();
  const { data: Property, refetch } = useQuery({
    queryKey: ["propertys"],
    queryFn: async () => {
      const res = await axoisPublic.get(`/propertys`);
      console.log(res.data);
      return res.data;
    },
  });
  return [Property, refetch];
};

export default UseProperty;
