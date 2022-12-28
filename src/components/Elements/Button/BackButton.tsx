import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import { Button } from "./Button";

export type BackButtonProps = {
  text?: string;
};

export const BackButton = ({ text = "Go back" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      startIcon={<ChevronLeftIcon className="w-auto h-4" aria-hidden="true" />}
      onClick={() => navigate(-1)}
    >
      <p className="text-xl font-bold leading-tight">{text}</p>
    </Button>
  );
};
