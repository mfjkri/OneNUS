import { Link } from "react-router-dom";
import * as z from "zod";

import { Button } from "components/Elements";
import { Form, InputField } from "components/Form";
import { useAuth } from "lib/auth";

const schema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
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

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="Username"
              maxLength={12}
              error={formState.errors["username"]}
              registration={register("username")}
            />
            <InputField
              type="password"
              label="Password"
              maxLength={12}
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
        <div className="text-sm text-primary">
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
