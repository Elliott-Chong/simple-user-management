import { Dialog, DialogContent } from "@/_components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
};
const Modal = ({ open, setOpen, className, children }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(className)}>{children}</DialogContent>
    </Dialog>
  );
};
export default Modal;
