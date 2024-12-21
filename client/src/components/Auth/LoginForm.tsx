import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import AuthService from "../../services/authService";
import authbg from "../../assets/authbg.jpg";
import { isAuthenticated } from "../../helpers/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginValues) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const res = await AuthService.loginUser(formData);
    // Get Auth User Details
    if (res === 200 || res === 304) {
      navigate("/", { replace: true });
      return showNotification({ message: "Login Successful", type: "success" });
    }

    return showNotification({
      message: "Login Failed - Please Try Again later",
      type: "error",
    });
  }

  return isAuthenticated() ? (
    (window.location.href = "/")
  ) : (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-center dark:bg-gray-800 shadow-md px-8 py-10 flex flex-col items-center"
      style={{
        backgroundImage: `url('${authbg}')`,
      }}
    >
      <div className="w-full max-w-md mx-auto mt-6 p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">DMCC DATABASE</h1>
          <p className="mt-2 text-sm text-white">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          {...field}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2.5 mt-6 bg-blue-600 text-white rounded-lg font-medium
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Not yet Registered?{" "}
            </span>
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
