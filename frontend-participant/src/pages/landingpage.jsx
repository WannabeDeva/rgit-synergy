import React from "react";
import { useNavigate } from "react-router-dom";
import UserAuth from "./UserAuth";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div >
        Landing page
      <UserAuth />
    </div>
  );
}
