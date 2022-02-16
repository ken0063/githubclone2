import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IAuthenticationData {
  accessToken?: string;
}

export interface IAuthenticationContext {
  logout?: () => void;
  setSession?: (data?: IAuthenticationData) => void;
  accessToken?: string;
  setAccessToken?: (token?: string) => void;
  setAuthData?: (data?: IAuthenticationData) => void;
  authData?: IAuthenticationData;
}

const AuthContext = createContext<IAuthenticationContext>({
  accessToken: null,
  authData: null,
  setAccessToken: () => {
    /* do nothing */
  },
  setSession: () => {
    /* do nothing */
  },
  logout: () => {
    /* do nothing */
  },
  setAuthData: () => {
    /* do nothing */
  },
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const existingAuthData: IAuthenticationData =
    Cookies.get("auth") && JSON.parse(Cookies.get("auth"));

  const [authData, setAuthData] =
    useState<IAuthenticationData>(existingAuthData);

  const [accessToken, setAccessToken] = useState<string>();
  const [clientId, setClientId] = useState<string>("");

  const setSession: () => void = useCallback((data?: IAuthenticationData) => {
    data ? Cookies.set("auth", JSON.stringify(data)) : Cookies.remove("auth");
    setAuthData(data);
  }, []);

  const logout: () => void = useCallback(() => {
    setSession();
    router.push("/login");
  }, [router, setSession]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setAccessToken(authData?.accessToken);
    }
  }, [authData]);

  const context = {
    authData,
    setAuthData,
    setAccessToken,
    accessToken,
    setSession,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
