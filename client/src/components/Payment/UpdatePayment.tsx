import React, { useContext, useEffect, useState } from "react";
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

const UpdatePayment = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const params = useParams();
  const { duesid, userid } = params;
  const { currentdues, dispatch } = useContext(CurrentDuesContext);
  const {
    currentmember,
    dispatch: mdispatch,
    loading,
  } = useContext(CurrentMemberContext);

  const [formData, setFormData] = useState(currentdues);

  useEffect(() => {
    const fetchDues = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await DuesService.getDuesById(duesid);
        console.log("Dues from DB", dbdata);
        secureLocalStorage.setItem("duesToUpdate", dbdata);
        setFormData(dbdata);
        dispatch({ type: "FETCH_SUCCESS", payload: dbdata });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILED", payload: error });
      }
    };
    const fetchMember = async () => {
      mdispatch({ type: "FETCH REQUEST" });
      try {
        const dbdata = await MemberService.getMemberById(userid);

        console.log("Fetch ", dbdata);
        mdispatch({ type: "FETCH_SUCCESS", payload: dbdata });
      } catch (error) {
        console.error(error);
        mdispatch({ type: "FETCH_FAILED", payload: error });
      }
    };
    fetchMember();
    fetchDues();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle success
      const res = await DuesService.updateDues(formData._id, formData);
      secureLocalStorage.removeItem("duesToUpdate");
      if (res === 200 || res === 304) {
        navigate(`/viewmember/${userid}`, { replace: true });
        return showNotification({
          message: "Payment recorded  updated successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return loading ? (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Loading Logo={Logo} />
      <div>Fetcting Dues Info ........</div>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          You are updating payment for :{" "}
          {currentmember?.firstname +
            " " +
            currentmember?.lastname +
            " " +
            currentmember?.othernames}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below accurately.
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="font-medium text-gray-700">
          Description
        </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="font-medium text-gray-700">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="paid_by" className="font-medium text-gray-700">
          Paid By:
        </label>
        <input
          id="paid_by"
          name="paid_by"
          value={formData.paid_by}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default UpdatePayment;
