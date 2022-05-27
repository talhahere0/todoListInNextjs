import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  //   const router = useRouter();
  //   const userLoggedIn = useSelector((state) => state.user.isLoggedIn);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       console.log("loggin", userLoggedIn);
  //       if (!userLoggedIn) {
  //         router.replace("/login");
  //         return;
  //       }
  //     }
  //   });
  return (
    <div>
      <h1>Welcome to dashboard</h1>
    </div>
  );
}
