import { useAuthState } from "@/stores/auth.store";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { FiAlertTriangle } from "react-icons/fi";
import FillLoading from "../shared/FillLoading";
import authService from "@/service/auth";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";

function Register() {
  const [error, setError] = useState("");
  const { setAuth } = useAuthState();
  const { isLoading } = useAuthStore();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await authService.register(values);
      toast.success("Registration successful, please login");

      setAuth("login");
    } catch (error) {
      const result = error as Error;
      toast.error("Something went wrong");
      setError(result.message);
    } finally {
    }
  }

  return (
    <div>
      {isLoading && <FillLoading />}
      <h2 className="text-xl font-bold">Register</h2>
      <p className="text-muted-foreground">
        Already have have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("login")}
        >
          Sign in
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Falonchi"
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
          <div className="grid grid-cols-2 gap-2">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
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
          </div>

          <Button className="h-12 w-full" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Register;
