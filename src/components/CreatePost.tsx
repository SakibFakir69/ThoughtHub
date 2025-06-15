"use client";

import React, { use, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm, Controller, SubmitHandler, set } from "react-hook-form";
import axios from "axios";

type OptionType = { value: string; label: string };

type FormData = {
  title: string;
  category: OptionType[];
  tags: OptionType[];
  description: string;
};

export default function CreatePost() {
  const [loading, setloading] = useState<boolean>();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const imgBB = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const uploadImageToImgBB = async (): Promise<string | null> => {
    if (!selectedFile) {
      alert("Please select an image first");
      return null;
    }
    if (!imgBB) {
      alert("ImgBB API key is missing");
      return null;
    }

    try {
      // Convert image file to base64 string
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (typeof reader.result === "string") {
              // Remove the data prefix and keep only base64 string
              const base64 = reader.result.split(",")[1];
              resolve(base64);
            }
          };
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(selectedFile);

      // Use FormData for the API
      const formData = new FormData();
      formData.append("key", imgBB);
      formData.append("image", base64Image);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      if (response.data && response.data.success) {
        console.log(response);
        return response.data.data.display_url;
      } else {
        alert("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Image upload error");
      return null;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setloading(true);
    // Upload image first
    const uploadedImageUrl = await uploadImageToImgBB();
    if (!uploadedImageUrl) return; // Stop if upload failed
    console.log(uploadImageToImgBB);

    // Map category and tags to array of strings
    const categoryStrings = data.category.map((option) => option.value);
    const tagStrings = data.tags.map((option) => option.value);

    // Prepare post data with image URL included
    const postData = {
      title: data.title,
      description: data.description,
      category: categoryStrings,
      tags: tagStrings,
      image: uploadedImageUrl, // add this
      views: 0,
      likes: 0,
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/api/user-post`,
        postData
      );

      setloading(false);

      reset();
      setSelectedFile(null);
      setImageUrl(uploadedImageUrl);

      alert("Post created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  /// cancel button 

  const cancelButton = ()=>{

    reset();



  }

  const animatedComponents = makeAnimated();

  const categoryOptions: OptionType[] = [
    { value: "technology", label: "Technology" },
    { value: "programming", label: "Programming" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "others", label: "Others" },
  ];

  const tagOptions: OptionType[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "webdev", label: "Web Development" },
    { value: "typescript", label: "TypeScript" },
    { value: "others", label: "Others" },
  ];

  return (
    <div className="flex w-full justify-center items-center border">
      <section className="p-4">
        <div>
          <h2 className="text-2xl font-semibold">Create New Post</h2>
          <p className="font-medium">
            Share your insights and stories with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label>Title</label>
            <input
              className="border w-80 p-2"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="border p-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>Category</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={categoryOptions}
                  className="w-80"
                  onChange={(val) => field.onChange(val)}
                  value={field.value}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-600">
                {errors.category.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label>Tags</label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={tagOptions}
                  className="w-80"
                  onChange={(val) => field.onChange(val)}
                  value={field.value}
                />
              )}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label>Description</label>
            <textarea
              className="border h-40 p-2 w-80"
              {...register("description")}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="btn px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "loading" : "Publish"}
            </button>
            <button onClick={cancelButton} type="button" className="btn px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
