import { Link } from "react-router-dom";

import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { useAuth } from "lib/auth";

import { AuthInputSchema } from "./Layout";

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <Form<LoginValues, typeof AuthInputSchema>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={AuthInputSchema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="Username"
              error={formState.errors["username"]}
              registration={register("username")}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password")}
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
    </div>
  );
};
