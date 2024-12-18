"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="School">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/schools">View All</HoveredLink>
            <HoveredLink href="/schools/addnew">Add new</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Students">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/students">View All</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Profile">
          <div className="flex flex-col space-y-4 text-sm">
            {session ? (
              <>
                <HoveredLink href="/profile">Set Up</HoveredLink>

                <HoveredLink href="#">
                  <Button
                    onClick={() => signOut()}
                    className="w-16 bg-red-500 text-sm"
                  >
                    Sign Out
                  </Button>
                </HoveredLink>
              </>
            ) : (
              <HoveredLink href="#">
                <button onClick={() => signIn("google")}>Sign In</button>
              </HoveredLink>
            )}
          </div>
        </MenuItem>

        {session && <p>Welcome {session.user?.name?.split(" ")}</p>}
      </Menu>
    </div>
  );
}
