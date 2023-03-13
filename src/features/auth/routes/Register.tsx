import { Layout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <Layout title="Register your new account">
      <RegisterForm onSuccess={() => {}} />
    </Layout>
  );
};
