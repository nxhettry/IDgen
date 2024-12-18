"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
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
            <HoveredLink href="/students">Students</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Profile">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/profile">Profile</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
