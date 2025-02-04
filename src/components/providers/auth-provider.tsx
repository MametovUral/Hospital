

import { ReactNode, useEffect, useState } from "react";
import FillLoading from "../shared/FillLoading";

function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser } = useUserState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && setUser(user);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? <FillLoading /> : <>{children}</>;
}

export default AuthProvider;
