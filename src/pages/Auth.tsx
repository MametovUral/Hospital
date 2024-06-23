import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";


import { Card } from "@/components/ui/card";
import { useAuthState } from "@/stores/auth.store";

function Auth() {
  const { authState } = useAuthState();

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-t from-foreground to-background">
      <Card className="p-8 w-1/3 relative">
        {authState === "login" && <Login />}
        {authState === "register" && <Register />}
      </Card>
    </div>
  );
}



export default Auth;
