import { useContext, useEffect, useState } from "react";
import Card from "../card/Card";
import "./Products.css";
import { addProduct, getProducts } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { Action, ActionType } from "../../store/actions";
import { StateContext, DispatchContext } from "../../App";
import { Colors, IProduct, ProductForm, Tags } from "../../store/state.interface";
import {Form, Button, Col, Container, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, FormText } from "reactstrap";
import ProductModal from "../product-modal/ProductModal";

export default function Products() {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleAddModal = () => setAddModal(!addModal);
  const toggleEditModal = () => setEditModal(!editModal);

  function setProducts(products: IProduct[]) {
    dispatch({ type: ActionType.SET_COMPANIES, payload: products });
  }


  const showToastMessage = (message: string) => {
    dispatch({
      type: ActionType.SHOW_TOAST,
      payload: message,
    });

    setTimeout(() => {
      dispatch({ type: ActionType.HIDE_TOAST });
    }, 3000);
  };

  const reload = ()=> getProducts(showToastMessage, navigate).then((products) => {
    if (products) setProducts(products);
  });

  useEffect(() => {
   reload();
  }, []);

  return (
    <>
    <Container fluid style={{width:'80vw'}}>
      <Row>
      <a className="blue" onClick={() => navigate("/")}>
        <span className="previous">&#8249;</span> Home
      </a>
      </Row>
      
      <Row>
        <Col>
        <h1 className="center">Products</h1>
        </Col>
        <Col size="xs" className="col-auto">
        {state.user.isAdmin && <Button className="background_blue" color="primary" onClick={()=>{
          toggleAddModal();
          dispatch({type: ActionType.SET_EDIT_PRODUCT, payload:{product: null}})
        }}>New product</Button>}</Col>
      </Row>
      <div className="products--list">
        {state.products.length &&
          state.products.map((product: IProduct) => (
            <Card key={product._id} product={product} toggle={toggleEditModal}/>
          ))}
      </div>
    </Container>

    <ProductModal type="Add" showToastMessage={showToastMessage} setProducts={setProducts} toggle={toggleAddModal} modal={addModal}/>
    <ProductModal type="Edit" showToastMessage={showToastMessage} setProducts={setProducts} toggle={toggleEditModal} modal={editModal}/>

</>
  );
}
