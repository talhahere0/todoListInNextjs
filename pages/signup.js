import react, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const createAccount = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_PLATFORM_URL}/api/user/registerUsers`,
        signUp
      )
      .then((jsonRes) => {
        setSignUp(jsonRes.data.newUser);
        setSignUp((prev) => {
          return {
            ...prev,
            username: "",
          };
        });
        setSignUp((prev) => {
          return {
            ...prev,
            email: "",
          };
        });
        setSignUp((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
        router.push("/login");
        toast.success("Signup Successfully", {
          theme: "dark",
          position: "bottom-right",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.message === "user already exists") {
          toast.warning(
            error.response.data.message || "Something went wrong!",
            {
              theme: "dark",
              position: "top-right",
              autoClose: 5000,
            }
          );
        } else {
          toast.error(error.response.data.message || "Something went wrong!", {
            theme: "dark",
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      });
  };

  return (
    <div className="bg-grey-lighter min-h-screen bg-slate-100 bg-opacity-60 flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-lg mt-2 text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            onChange={(event) => {
              setSignUp((prev) => {
                return {
                  ...prev,
                  username: event.target.value,
                };
              });
            }}
            value={signUp.username}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Username"
          />

          <input
            type="text"
            onChange={(event) => {
              setSignUp((prev) => {
                return {
                  ...prev,
                  email: event.target.value,
                };
              });
            }}
            value={signUp.email}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            onChange={(event) => {
              setSignUp((prev) => {
                return {
                  ...prev,
                  password: event.target.value,
                };
              });
            }}
            value={signUp.password}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <button
            onClick={createAccount}
            className="w-full text-center py-3 rounded bg-brand-3 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a className="no-underline ml-1" href="#">
              Terms of Service
            </a>{" "}
            and
            <a className="no-underline ml-1" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className=" mt-6 flex gap-2 items-center">
          <span className="text-gray-400">Already have an account?</span>
          <span className=" text-gray-400 hover:text-blue-600 font-semibold">
            <Link href="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
