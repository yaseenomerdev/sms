import AuthGuard from "components/AuthGuard";
import { useUser } from "context/userContext";
import React from "react";
import Register from "../components/register";

export default function Signup() {
  const { user } = useUser();
  if (!user) return <AuthGuard />;
  return <Register />;
}
