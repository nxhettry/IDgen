"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Popup = ({ schoolName }: { schoolName: string; }) => {
  const [className, setClassName] = useState<string>("");

  const saveSchool = async () => {
    if (className === "") {
      alert("School name cannot be blank");
      return;
    }

    try {
      const res = await axios.post(
        `/api/school/${schoolName}/add`,
        {
          className,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === 200) {
        alert("Class added successfully");
        console.log(res.data);
        // window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`h-40 w-64 rounded-xl z-20 text-white flex flex-col gap-4 justify-center items-center`}
        >
          <div
            className={`bg-green-300 rounded-xl hover:scale-110 transition ease-in-out duration-200 text-center font-bold h-full w-full text-black flex justify-center items-center`}
          >
            <p className="text-2xl">Add New Class</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter classname or number</DialogTitle>
          <DialogDescription>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Eg. Class 1"
              className="w-80 h-10 rounded-lg pl-2 mr-2"
              required
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={saveSchool}>Add Class</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
