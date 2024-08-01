import { Button } from "../../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { UnknownAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface Props {
  funcAction: () => UnknownAction | Promise<void>;
  triggerButtonCont: string | ReactNode;
  actionButtonCont: string;
  otherClasses?: string;
}

const Modal = ({
  funcAction,
  triggerButtonCont,
  actionButtonCont,
  otherClasses,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${otherClasses}`}>{triggerButtonCont}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start md:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="px-5 py-3 text-black text-[13px] leading-4 tracking-[0.12px]  rounded-md flex items-center justify-center hover:bg-opacity-80 duration-300"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={funcAction}
            className="bg-red-600 px-5 py-3 text-white text-[13px] leading-4 tracking-[0.12px]  rounded-md flex items-center justify-center hover:bg-opacity-80 duration-300"
          >
            {actionButtonCont}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
