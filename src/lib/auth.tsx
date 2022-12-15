import { initReactQueryAuth } from "react-query-auth";

import { Spinner } from "components/Elements";
import {
  loginWithUsernameAndPassword,
  getUser,
  registerWithUsernameAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from "features/auth";
import storage from "utils/storage";

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithUsernameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithUsernameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
  return null;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

// AuthProvider is the layer where all children components require authentication
// useAuth can be used to retrieve authenticated user / any other auth related methods
export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
