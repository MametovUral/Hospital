import { loginSchema } from "@/lib/validation";
import { useAuthState } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { FiAlertTriangle } from "react-icons/fi";
import FillLoading from "../shared/FillLoading";
import authService from "@/service/auth";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";

function Login() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setAuth } = useAuthState();

  const { isLoading, signUserStart, signUsersSuccess } = useAuthStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    signUserStart();
    try {
      const res = await authService.login(values);
      signUsersSuccess(res.data);
      toast.success("successfully logged in");
      navigate("/");
    } catch (error) {
      const result = error as Error;
      toast.error("Something went wrong");
      setError(result.message);
    }
  }

  return (
    <div>
      {isLoading && <FillLoading />}

      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>
      <Separator className="my-3" />
      {error && (
        <Alert className="mb-2" variant="destructive">
          <FiAlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email adress</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pasword</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="h-12 w-full" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
