"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface Ingredient {
  section: string;
  items: string[];
}

interface Instruction {
  step: string;
  image: string; // Ảnh minh họa từng bước
}

interface RecipeForm {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  serves: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export default function CreateRecipePage() {
  const [formData, setFormData] = useState<RecipeForm>({
    title: "",
    description: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    image: "",
    ingredients: [{ section: "", items: [""] }],
    instructions: [{ step: "", image: "" }],
  });

  // 🧩 Hàm thay đổi field chính
  const handleChange = (field: keyof RecipeForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🧂 Nguyên liệu
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: any
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  // 🍳 Bước thực hiện
  const handleInstructionChange = (
    index: number,
    field: keyof Instruction,
    value: string
  ) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index][field] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  // 🧺 Thêm phần nguyên liệu
  const addIngredientSection = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { section: "", items: [""] }],
    });
  };

  // 🧁 Thêm bước
  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { step: "", image: "" }],
    });
  };

  // 📸 Upload ảnh bước thực hiện
  const handleStepImageUpload = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      handleInstructionChange(index, "image", previewUrl);
    }
  };

  // 📨 Gửi form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Recipe submitted:", formData);
    alert("✅ Công thức đã được gửi đi (xem log console)");
  };

  // 🍽️ Render form
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Đăng tải công thức mới
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-xl shadow-sm border"
      >
        {/* 🧾 Tiêu đề món ăn */}
        <div>
          <label className="block font-medium mb-2">Tên món ăn</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* 📝 Mô tả */}
        <div>
          <label className="block font-medium mb-2">Mô tả ngắn</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* ⏱ Thời gian & khẩu phần */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-2">Thời gian chuẩn bị</label>
            <input
              type="text"
              value={formData.prepTime}
              onChange={(e) => handleChange("prepTime", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="15 min"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Thời gian nấu</label>
            <input
              type="text"
              value={formData.cookTime}
              onChange={(e) => handleChange("cookTime", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="20 min"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Khẩu phần</label>
            <input
              type="text"
              value={formData.serves}
              onChange={(e) => handleChange("serves", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="4 people"
            />
          </div>
        </div>

        {/* 🖼️ Ảnh đại diện món ăn */}
        <div>
          <label className="block font-medium mb-2">Ảnh minh họa (URL)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="/banner01.jpg"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="mt-4 w-64 h-40 object-cover rounded-md shadow-sm"
            />
          )}
        </div>

        {/* 🧂 Nguyên liệu */}
        <div>
          <label className="block font-medium mb-3">Nguyên liệu</label>
          {formData.ingredients.map((ing, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
              <input
                type="text"
                placeholder="Tên phần (VD: For the crust)"
                value={ing.section}
                onChange={(e) =>
                  handleIngredientChange(index, "section", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
              />
              <textarea
                placeholder="Danh sách nguyên liệu (cách nhau bởi dấu phẩy)"
                value={ing.items.join(", ")}
                onChange={(e) =>
                  handleIngredientChange(index, "items", e.target.value.split(","))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientSection}
            className="text-orange-500 text-sm font-medium mt-2 hover:underline"
          >
            + Thêm phần nguyên liệu
          </button>
        </div>

        {/* 🍳 Các bước thực hiện */}
        <div>
          <label className="block font-medium mb-3">Các bước thực hiện</label>
          {formData.instructions.map((inst, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
              <input
                type="text"
                value={inst.step}
                onChange={(e) => handleInstructionChange(index, "step", e.target.value)}
                placeholder={`Bước ${index + 1}`}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleStepImageUpload(index, e)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {inst.image && (
                <img
                  src={inst.image}
                  alt={`step-${index + 1}`}
                  className="mt-3 w-full sm:w-72 h-44 object-cover rounded-md shadow-sm"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="text-orange-500 text-sm font-medium mt-2 hover:underline"
          >
            + Thêm bước
          </button>
        </div>

        {/* 🚀 Nút Submit */}
        <div className="pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Đăng công thức
          </button>
        </div>
      </form>
    </section>
  );
}
