import * as z from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { useAuth } from "lib/auth";
import { isAlphaOnlyString } from "utils/strings";

import { AuthAvatarPreview } from "./Layout";

const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Required")
    .max(10, "Maximum of 10 characters")
    .refine((val) => isAlphaOnlyString(val), {
      message: "Only alphabetical letters allowed",
    }),
  password: z.string().min(1, "Required").max(32, "Maximum of 32 characters"),
});

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();
  const [username, setUsername] = useState("");

  return (
    <>
      <Form<LoginValues, typeof LoginFormSchema>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={LoginFormSchema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="Username"
              error={formState.errors["username"]}
              registration={register("username", {
                onChange: (e) => {
                  setUsername(e.target.value);
                },
              })}
              icon={<AuthAvatarPreview username={username} />}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password")}
              icon={<LockClosedIcon className="h-4 w-4" aria-hidden="true" />}
            />
            <div>
              <Button isLoading={isLoggingIn} type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          Don't have an account yet?{" "}
          <Link
            to="../register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};
