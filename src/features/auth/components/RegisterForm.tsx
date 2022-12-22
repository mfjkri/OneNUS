import { Link } from "react-router-dom";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { useAuth } from "lib/auth";

import { AuthInputSchema } from "./Layout";

type RegisterValues = {
  username: string;
  password: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();

  return (
    <div>
      <Form<RegisterValues, typeof AuthInputSchema>
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={AuthInputSchema}
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
              registration={register("username")}
              icon={<UserIcon className="h-4 w-4" aria-hidden="true" />}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password")}
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
    </div>
  );
};
