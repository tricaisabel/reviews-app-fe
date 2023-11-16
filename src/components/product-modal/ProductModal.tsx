import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {
  Tags,
  Colors,
  ProductForm,
  IProduct,
} from "../../store/state.interface";
import {
  addProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../../api/product";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";

export type Props = {
  showToastMessage: (message: string) => void;
  setProducts: (products: IProduct[]) => void;
  toggle: () => void;
  modal: boolean;
  type: "Add" | "Edit";
};

const ProductModal: React.FC<Props> = ({
  showToastMessage,
  setProducts,
  modal,
  toggle,
  type,
}) => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    file: undefined,
    price: 0,
    tags: Tags.BEANIES,
    color: Colors.BLACK,
    discount: 0,
    composition: "",
  });

  React.useEffect(() => {
    if (state.editedProduct) {
      setForm({
        name: state.editedProduct.name,
        file: undefined,
        price: state.editedProduct.price,
        tags: Tags.BEANIES,
        color: Colors.BLACK,
        discount: state.editedProduct.discount,
        composition: state.editedProduct.composition,
      });
    } else {
      setForm({
        name: "",
        file: undefined,
        price: 0,
        tags: Tags.BEANIES,
        color: Colors.BLACK,
        discount: 0,
        composition: "",
      });
    }
  }, [state.editedProduct]);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm((state) => {
      return {
        ...state,
        [name]: name === "file" && files ? files[0] : value,
      };
    });
  };

  const submitForm = () => {
    if (type === "Add") {
      addProduct(form).then(() => {
        getProducts(showToastMessage, navigate).then((products) => {
          if (products) setProducts(products);
        });
      });
    } else if (type === "Edit" && state.editedProduct) {
      editProduct(form, state.editedProduct?._id).then(() => {
        getProducts(showToastMessage, navigate).then((products) => {
          if (products) setProducts(products);
        });
      });
    }
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={() => toggle()} backdrop={false} size="md">
      <ModalHeader toggle={() => toggle()}>{type} a product</ModalHeader>
      <ModalBody>
        <Form className="p-4">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              required
              id="name"
              name="name"
              placeholder="Product name"
              type="text"
              value={form.name}
              onChange={(e) => changeForm(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="Product price"
              type="number"
              value={form.price}
              onChange={(e) => changeForm(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="tags">Tag</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="Product type"
              type="select"
              value={form.tags}
              onChange={(e) => changeForm(e)}
            >
              {Object.values(Tags).map((name, i) => (
                <option value={name} key={i}>{name}</option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="color">Color</Label>
            <Input
              id="color"
              name="color"
              placeholder="Product color"
              type="select"
              value={form.color}
              onChange={(e) => changeForm(e)}
            >
              {Object.values(Colors).map((name,i) => (
                <option value={name} key={i}>{name}</option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="discount">Discount</Label>
            <Input
              id="discount"
              name="discount"
              placeholder="Price dicount"
              type="number"
              value={form.discount}
              onChange={(e) => changeForm(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="composition">Fabric composition</Label>
            <Input
              id="composition"
              name="composition"
              placeholder="Fabric composition"
              type="text"
              value={form.composition}
              onChange={(e) => changeForm(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => changeForm(e)}
            />
            <FormText>Please upload an image of the product</FormText>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitForm}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={() => toggle()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;
