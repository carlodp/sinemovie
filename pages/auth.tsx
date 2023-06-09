import Input from "@/components/Input";
import Head from "next/head";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    console.log(variant);
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Head>
        <title>{variant === "login" ? "Login" : "Register"} | SineMovie</title>
      </Head>
      <div className="bg-black h-full w-full lg:bg-opacity-80 flex flex-col justify-center items-center">
        <nav className="px-12 pb-10 mt-[-50px]">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-12 mx-auto"
          />
        </nav>

        <div className="flex justify-center w-full">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  type="Full Name"
                  id="name"
                  value={name}
                  label="Full Name"
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                type="email"
                id="email"
                value={email}
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                value={password}
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-[#E3A433] py-3 text-white rounded-md w-full mt-10 hover:bg-[#E3A433] hover:bg-opacity-90 transition"
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>

            {variant === "login" ? (
              <p className="text-neutral-500 mt-12 text-sm">
                First time using SineMovie?
                <span
                  onClick={toggleVariant}
                  className="text-[#E3A433] ml-1 hover:underline cursor-pointer"
                >
                  Create an account
                </span>
              </p>
            ) : (
              <p className="text-neutral-500 mt-12 text-sm">
                Already have an account?
                <span
                  onClick={toggleVariant}
                  className="text-[#E3A433] ml-1 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
