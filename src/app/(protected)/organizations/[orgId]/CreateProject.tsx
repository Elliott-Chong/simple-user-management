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

type Props = {
  orgId: string;
};

const CreateProject = ({ orgId }: Props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const createProject = api.organizations.createProject.useMutation({
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
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createProject.mutate({ name, orgId });
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
            <Button isLoading={createProject.isLoading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
