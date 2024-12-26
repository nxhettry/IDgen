"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const checkAuth = () => {
    if (!session) {
      setShowLoginPopup(true);
      return;
    }

    router.push("/schools");
  };

  return (
    <div className="h-full w-full flex justify-start pt-48 items-center gap-7 text-white flex-col">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-4xl font-ubuntu-mono font-bold">ID{"-"}GEN</p>
        <p className="text-md font-ubuntu font-semibold text-gray-50">
          Generate professional looking IDs at a click
        </p>
      </div>

      <Button
        onClick={checkAuth}
        className="bg-white text-black h-12 w-32 text-lg font-bold hover:scale-110 transition ease-in-out duration-300 z-30 hover:bg-gray-200"
      >
        Get Started
      </Button>

      {/* Login Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowLoginPopup(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8 transform transition-all">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close login popup"
            >
              <IoMdClose className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Login to Continue
              </h2>
              <p className="text-gray-600">
                Please sign in to access your account
              </p>
            </div>

            <div className="space-y-6">
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="w-6 h-6" />
                <span className="text-gray-700 font-medium">
                  Login with Google
                </span>
              </button>

              <p className="text-center text-sm text-gray-500">
                Continue with your Google account
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
