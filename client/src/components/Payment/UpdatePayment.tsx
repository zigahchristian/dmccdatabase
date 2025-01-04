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
import DuesService from "@/services/duesService";
import { CurrentDuesContext } from "@/contexts/CurrentDuesContext";
import MemberService from "@/services/memberService";
import { CurrentMemberContext } from "@/contexts/CurrentMemberContext";
import Loading from "../Loading/Loading";
import Logo from "../../assets/dmcc.png";

const formSchema = z.object({
  description: z.string().min(4, {
    message: "Description is required.",
  }),
  amount: z.number().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  date: z.date().optional(),
  paid_by: z.string().min(4, { message: "Paid by is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const UpdatePayment = () => {
  const params = useParams();
  const { duesid, userid } = params;
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const date = new Date();
  const currentYear = date.getFullYear();

  const { currentdues, loading } = useContext(CurrentDuesContext);
  const { dispatch } = useContext(CurrentDuesContext);
  const { currentmember } = useContext(CurrentMemberContext);
  const { dispatch: mdispatch } = useContext(CurrentMemberContext);

  useEffect(() => {
    const fetchMember = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await MemberService.getMemberById(userid);
        mdispatch({ type: "FETCH_SUCCESS", payload: dbdata });
      } catch (error) {
        console.error(error);
        mdispatch({ type: "FETCH_FAILED", payload: error });
      }
    };

    const fetchDues = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await DuesService.getDuesById(duesid);
        secureLocalStorage.setItem("currentdues", dbdata);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILED", payload: error });
      }
    };
    fetchMember();
    fetchDues();
  }, []);

  const cdues: any = secureLocalStorage.getItem("currentdues");

  if (cdues === null) {
    return window.location.reload();
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: cdues.description,
      amount: parseInt(cdues.amount),
      paid_by: cdues.paid_by,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("amount", values.amount);
      formData.append("paid_by", values.paid_by);

      // Handle success
      const res = await DuesService.updateDues(cdues._id, formData);
      if (res === 200 || res === 304) {
        navigate(`/`, { replace: true });
        secureLocalStorage.removeItem("currentdues");
        return showNotification({
          message: "Payment recorded  updated successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  }

  return loading ? (
    <Loading logoUrl={Logo} />
  ) : (
    <div className="w-full m-2 mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                You are updating payment for :{" "}
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
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Description
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Description" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={`Haverst Levy ${currentYear}`}>
                            Haverst Levy {currentYear}
                          </SelectItem>
                          <SelectItem value={`Church Dues ${currentYear}`}>
                            Church Dues {currentYear}
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
            <div className="flex justify-center items-center">
              <Button className=" bg-green-700  w-50 ml-6 mr-6 py-4 px-4 rounded w-full sm:w-40 lg:w-48">
                {" "}
                Update Payment
              </Button>
              <Button className="bg-red-700 w-50 ml-6 mr-6 py-4 px-4 rounded w-full sm:w-40 lg:w-48">
                Delete Payment
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePayment;
