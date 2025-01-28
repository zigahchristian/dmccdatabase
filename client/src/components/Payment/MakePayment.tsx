import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import secureLocalStorage from "react-secure-storage";
import { useParams } from "react-router-dom";
import MemberService from "@/services/memberService";
import DuesService from "@/services/duesService";
import { CurrentMemberContext } from "@/contexts/CurrentMemberContext";

const formSchema = z.object({
  description: z.string().min(4, {
    message: "Description is required.",
  }),
  amount: z.string().min(1, {
    message: "Username must be at least 4 characters.",
  }),
  date: z.date().optional(),
  paid_by: z.string().min(4, { message: "Paid by is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const MakePayment = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const date = new Date();
  const currentYear = date.getFullYear();

  const { currentmember } = useContext(CurrentMemberContext);
  const { dispatch } = useContext(CurrentMemberContext);

  useEffect(() => {
    const fetchMember = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await MemberService.getMemberById(id);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata });
        secureLocalStorage.setItem("currentmember", dbdata);
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILED", payload: error });
      }
    };
    fetchMember();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      paid_by: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("amount", values.amount);
      formData.append("paid_by", values.paid_by);

      // Handle success
      const res = await DuesService.addDues(id, formData);
      if (res === 200 || res === 304) {
        navigate("/", { replace: true });
        return showNotification({
          message: "Payment recorded successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  }
  return (
    <div className="w-full m-2 mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                You are making payment for :{" "}
                {currentmember?.firstname +
                  " " +
                  currentmember?.lastname +
                  " " +
                  currentmember.othernames}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Fill in the details below accurately.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Amount"
                          {...field}
                          className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Amount"
                        {...field}
                        className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paid_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid By</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter Paid By"
                        {...field}
                        className="
                              bg-gray-50 border-0
                              focus:ring-2 focus:ring-blue-500
                              placeholder:text-gray-400
                            "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <br />
            <Button className="w-full mt-2"> Make Payment</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MakePayment;
