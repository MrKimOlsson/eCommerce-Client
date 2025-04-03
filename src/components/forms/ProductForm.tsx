import React from 'react';

interface ProductFormProps {
  onSubmit: (formData: any) => void;
  initialData?: Partial<any>;
  isEditing: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData = {}, isEditing }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: '',
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Product' : 'New Product'}</h2>
      <input
        type="text"
        placeholder="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;