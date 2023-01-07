import * as z from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { useAuth } from "lib/auth";
import { isAlphaOnlyString } from "utils/strings";

const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Required")
      .max(10, "Maximum of 10 characters")
      .refine((val) => isAlphaOnlyString(val), {
        message: "Only alphabetical letters allowed",
      }),
    password: z.string().min(1, "Required").max(32, "Maximum of 32 characters"),
    cpassword: z.string().min(1, "Required"),
  })
  .superRefine(({ password, cpassword }, ctx) => {
    if (password !== cpassword) {
      ctx.addIssue({
        code: "custom",
        path: ["cpassword"],
        message: "Passwords do not match.",
      });
    }
  });

type RegisterValues = {
  username: string;
  password: string;
  cpassword: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();
  const [username, setUsername] = useState("");

  return (
    <>
      <Form<RegisterValues, typeof RegisterFormSchema>
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={RegisterFormSchema}
        options={{
          shouldUnregister: true,
        }}
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
              icon={
                username && (
                  <img
                    src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
                    alt=""
                    className="w-4 h-4"
                  />
                )
              }
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password")}
              icon={<LockClosedIcon className="h-4 w-4" aria-hidden="true" />}
            />
            <InputField
              type="password"
              label="Confirm Password"
              error={formState.errors["cpassword"]}
              registration={register("cpassword")}
              icon={<LockClosedIcon className="h-4 w-4" aria-hidden="true" />}
            />

            <div>
              <Button
                isLoading={isRegistering}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          Already have an account?{" "}
          <Link
            to="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};
