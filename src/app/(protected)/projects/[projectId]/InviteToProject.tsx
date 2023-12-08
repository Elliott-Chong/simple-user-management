"use client";
import { DialogHeader } from "@/_components/ui/dialog";
import Modal from "@/app/_components/Modal";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { api } from "@/trpc/react";
import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = { project: Project };

const InviteToProject = ({ project }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  const inviteStakeholder = api.project.inviteStakeholder.useMutation({
    onSuccess: () => {
      toast.success("Invited Stakeholder");
      router.refresh();
      setEmail("");
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <DialogHeader>Invite Person</DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inviteStakeholder.mutate({
              email,
              projectId: project.id,
            });
          }}
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="h-4"></div>
          <Button isLoading={inviteStakeholder.isLoading} type="submit">
            Invite
          </Button>
        </form>
      </Modal>
      <Button onClick={() => setOpen(true)}>
        Invite stakeholder to Project
      </Button>
    </>
  );
};

export default InviteToProject;
