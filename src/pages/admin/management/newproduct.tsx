import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/ProductAPI";
import { userReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const navigate=useNavigate()
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();
  const [rating, setRating] = useState(4);
  const [tags, setTags] = useState("");
  const [description,setDescription] = useState("");

  const [newProduct] = useNewProductMutation();
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };
  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!name || !photo || !category || !stock || !price || !tags || !rating ||!description)
    //   return toast.error("Fill the each and every Field");
    const formData=new FormData();

    formData.set("name", name);
    formData.set("category", category);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("rating", rating.toString());
    formData.set("tags", tags);
    formData.set("photo", photo!);
    formData.set("description", description);
    // formData.append("photo", photo);

    const res=await newProduct({id:user?._id!,formData});
    responseToast(res,navigate,'/admin/products')
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>
         <div>
          <label>Add Description</label>
          <input type="text"
            placeholder="Add Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
         </div>
            <div>
              <label>Enter Tags here</label>
              <input
                type="text"
                placeholder="Enter a ,(comma) after each tag"
                onChange={e=> setTags(e.target.value)}
              />
            </div>
            <div>
              <label >Rating</label>
              <input type="number" placeholder="Enter Rating out of 5" 
               onChange={e => setRating(Number(e.target.value))}/>
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
