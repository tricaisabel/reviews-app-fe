import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { getCartProducts, removeProductFromCart } from "../../api/product";
import { ICartItem } from "../../store/state.interface";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DispatchContext, StateContext } from "../../App";
import { ActionType, Action } from "../../store/actions";

const Cart: FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ICartItem[]>([]);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const state = useContext(StateContext);


  const reload = ()=>{
    getCartProducts().then((items) => {
      setItems(items);
      let sum = 0;
      items.forEach((item:any) => (sum += item.quantity * item.productPrice));
      dispatch({type:ActionType.SET_TOTAL,total: sum});
    });
  }
  React.useEffect(() => {
    reload();
  }, []);

  const deleteCartItem = (itemId: string)=>{
    removeProductFromCart(itemId);
    setItems((prev)=>{
      return prev.filter(item=>item._id!==itemId)
    })
  }
  
  return (
    <Container style={{ width: "80vw" }}>
      <a className="blue" onClick={() => navigate("/products")}>
        <span className="previous">&#8249;</span> Back
      </a>
      <h1 className="center">Shopping Cart</h1>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price / piece</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td><a href={`/products/${item._id}`}>{item._id}</a></td>
              <td>
                <img
                  src={item.productImage}
                  alt="cart item"
                  width={80}
                  height={100}
                />
              </td>
              <td>{item.productName}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>
                {item.productPrice} EUR
              </td>
              <td><b>{item.quantity * item.productPrice} EUR</b></td>
              <td><Button outline color="light" onClick={()=>deleteCartItem(item._id)}><FontAwesomeIcon icon={faTrash} style={{color: "#284576"}} /></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
      <Col>
        </Col>
        <Col size="xs" className="col-auto">
        <h3>Total: {state.total} EUR</h3>
        </Col>
      </Row>
     
     <Row className="justify-content-center">
      {items.length>0 && <Button color="primary" className="background_blue" style={{width:'fit-content'}} onClick={()=>navigate(`/checkout`)}>Go to checkout</Button>}</Row>
    </Container>
  );
};

export default Cart;
