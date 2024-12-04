import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "../../helpers/data/user";
import { ImageUpload } from "./ImageUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

const editUserSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(2, "Role is required"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

type EditUserValues = z.infer<typeof editUserSchema>;

interface EditUserPageProps {
  user: User;
  onSave: (data: EditUserValues) => Promise<void>;
}

export function EditUserPage({ user, onSave }: EditUserPageProps) {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<EditUserValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      bio: user.bio,
      skills: user.skills,
    },
  });

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !form.getValues("skills").includes(newSkill.trim())
    ) {
      form.setValue("skills", [...form.getValues("skills"), newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      "skills",
      form.getValues("skills").filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = async (values: EditUserValues) => {
    try {
      const formData = new FormData();

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      // Append other form data
      Object.entries(values).forEach(([key, value]) => {
        if (key === "skills") {
          formData.append(key, JSON.stringify(value));
        } else if (key !== "avatar") {
          formData.append(key, value);
        }
      });

      await onSave(values);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Avatar */}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skills */}
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {form.watch("skills").map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="pl-3 pr-2 py-1 flex items-center gap-1"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:bg-gray-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
