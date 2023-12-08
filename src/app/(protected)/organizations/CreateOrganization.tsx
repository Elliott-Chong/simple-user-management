"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const CreateOrganization = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const createOrganization = api.organizations.createOrganization.useMutation({
    onSuccess: () => {
      setName("");
      setOpen(false);
      router.refresh();
    },
    onError(error) {
      console.error(error);
      toast.error(error.message);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Create Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createOrganization.mutate({ name });
          }}
        >
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="h-4"></div>
          <div className="flex items-center justify-between">
            <Button isLoading={createOrganization.isLoading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganization;
