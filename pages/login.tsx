import { useCallback, useState } from "react";
import GitHubLogin from "github-login";
import axios from "axios";
import useAuth, { IAuthenticationData } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { login } from "./api/login";
import { handleResponseError } from "../lib/utils";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const { setSession } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const onSuccess = async (response: { code: string }) => {
    setIsLoading(true);
    const res = await login(response?.code);
    const responseError = handleResponseError(response);

    if ((res && !res?.data) || !res || responseError) {
      toast.error(responseError ?? "Wrong Code.");
      router.push("/login");
      return;
    }

    console.log(res?.data?.data);

    const { access_token } = res?.data?.data;

    const authData: IAuthenticationData = {
      accessToken: access_token,
    };

    setSession(authData);

    router.push("/");
    setIsLoading(false);
  };

  const onFailure = (response: Error) => console.error(response);

  return (
    <div className="grid place-items-center h-screen w-screen">
      {isLoading ? (
        <Oval color="#5C5C5C" height={80} width={80} />
      ) : (
        <GitHubLogin
          clientId="4f262cc9e20d3043da02"
          onSuccess={onSuccess}
          onFailure={onFailure}
          redirectUri=""
          className="bg-[#5C5C5C] border-2 border-[#5C5C5C] rounded-[5px] w-[179px] py-[11px] text-white font-bold text-[16px] leading-[21px] hover:bg-gray-500 hover:border-gray-500"
        >
          Login
        </GitHubLogin>
      )}
    </div>
  );
};

export default Login;
