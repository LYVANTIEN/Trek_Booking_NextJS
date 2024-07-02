'use client'
import { useRouter, useSearchParams } from "next/navigation";
import Homepage from "../components/Homepage";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "notAuthorized") {
      toast.error("You are not authorized to access the supplier area.");
    }
  }, [searchParams]);
  return (
    <div>
      <Homepage></Homepage>
    </div>
  );
}