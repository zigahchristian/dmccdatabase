import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import { MemberContext } from "../../contexts/MemberContext";
import { serverName } from "@/helpers/http-common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "./ImageUpload";

const formSchema = z.object({
  avatar: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateImage = () => {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const { members } = useContext(MemberContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const imgToUpdate = members.filter((member) => member._id === id);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  /*
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files?.[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      setLoading(true);
      console.log(values, formData);
      return;
      // Read the file as a buffer
      const formData = new FormData();
      formData.append("members", file);
      const res = await axios.post(
        "http://localhost:7240/members/newBulkMembersUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        showNotification({
          message: "Bulk Users Added Successfully!",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showNotification({ message: "Failed to upload file.", type: "error" });
    } finally {
      setLoading(false);
    }
  }; */

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col items-center gap-10 h-full bg-gray-100">
            <div className="w-auto">
              <h3 className="text-sm font-bold item-center justify-center  mb-4 mt-10">
                Old Image - to Update....
              </h3>
              <img
                src={`${serverName}/static/${imgToUpdate[0].avatar}`}
                className="h-[10rem] w-[10rem]"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold text-center mb-4">
                Upload Image File
              </h2>
              <div>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={(dataUrl, file) => {
                            field.onChange(dataUrl);
                            if (file) setAvatarFile(file);
                          }}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Update Image
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateImage;
