import type { NextPage } from "next";
import useAuth from "../hooks/useAuth";

const Home: NextPage = (): JSX.Element => {
  const {logout}=useAuth()
  return <div className="grid place-items-center h-screen w-screen">
   <button onClick={logout}>Logout</button>
  </div>;
};

export default Home;
