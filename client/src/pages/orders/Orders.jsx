import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => res.data),
  });

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        {isLoading ? (
          <p>Loading your orders...</p>
        ) : error ? (
          <p className="error">Something went wrong! Please try again later.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4">No orders found.</td>
                </tr>
              ) : (
                data.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img
                        className="image"
                        src={order.img}
                        alt={`Order ${order.title}`}
                      />
                    </td>
                    <td>{order.title}</td>
                    <td>{order.price}</td>
                    <td>
                      <Link to={`/messages/${order._id}`}>
                        <img
                          className="message"
                          src="./icons/message.png"
                          alt="Message"
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
