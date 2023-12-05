"use client";
import { Button } from "@/app/_components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <Button
      onClick={() => {
        signOut().catch(console.error);
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
