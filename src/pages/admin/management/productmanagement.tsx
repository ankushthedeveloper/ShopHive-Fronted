import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteProductMutation,
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/api/ProductAPI";
import { server } from "../../../redux/store";
import { userReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";
import { Skeleton } from "../../../components/Loader";

const Productmanagement = () => {
  const { id } = useParams();
  const { data: res ,isLoading,isError} = useSingleProductQuery(id!);

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { price, name, stock, photo, category, tags, description, rating } =
    res?.data || {
      name: "",
      price: 0,
      stock: 0,
      photo: "",
      category: "",
      tags: "",
      description: "",
      rating: 0,
    };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);
  const [ratingUpdate, setRatingUpdate] = useState<number>(rating);
  const [tagsUpdate, setTagsUpdate] = useState<string>(tags);
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };
  const deleteHandler = async () => {
    const response = await deleteProduct({
      userId: user?._id!,
      productId: id!,
    });

    responseToast(response, navigate, "/admin/product");
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate) formData.set("stock", stockUpdate.toString());
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (photoFile) formData.set("photo", photoFile);
    if (descriptionUpdate) formData.set("description", descriptionUpdate);
    if (ratingUpdate) formData.set("rating", ratingUpdate.toString());
    if (tagsUpdate) formData.set("tags", tagsUpdate);

    const response = await updateProduct({
      formData,
      userId: user?._id!,
      productId: id!,
    });

    responseToast(response, navigate, "/admin/product");
  };

  useEffect(() => {
    if (res) {
      setNameUpdate(res.data.name);
      setPriceUpdate(res.data.price);
      setStockUpdate(res.data.stock);
      setCategoryUpdate(res.data.category);
      setPhotoUpdate(res.data.photo);
      setTagsUpdate(res.data.tags);
      setDescriptionUpdate(res.data.description);
      setRatingUpdate(res.data.rating);
    }
  }, [res]);

  if(isError) return navigate('/404')

  return (
    <div className="admin-container">
      <AdminSidebar />
     {isLoading?<Skeleton length={20}/> : <main className="product-management">
        <section>
          <strong>ID - {res?.data._id}</strong>
          <img src={`${server}/${photo}`} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
              required={true}
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
              required={true}
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Rating</label>
              <input
              required={true}
                type="number"
                max={5}
                min={0}
                placeholder="Price"
                value={ratingUpdate}
                onChange={(e) => setRatingUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
              required={true}
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                required={true}
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <input
                type="text"
                required={true}
                placeholder="Enter Description for the product"
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Tags</label>
              <input
                type="text"
                required={true}
                placeholder="Enter Tags for the product"
                value={tagsUpdate}
                onChange={(e) => setTagsUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler}  />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>}
    </div>
  );
};

export default Productmanagement;
