import React from "react";
import PropTypes from "prop-types"; // PropTypes for type checking
import "./MyGigsTable.css"; // Create a separate CSS file for table styles

const MyGigsTable = ({ data, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Sales</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5">No gigs found.</td>
          </tr>
        ) : (
          data.map((gig) => (
            <tr key={gig._id}>
              <td>
                <img className="image" src={gig.cover} alt={gig.title} />
              </td>
              <td>{gig.title}</td>
              <td>₹{gig.price}</td>
              <td>{gig.sales}</td>
              <td>
                <img
                  className="delete"
                  src="./img/delete.png"
                  alt="Delete"
                  onClick={() => onDelete(gig._id)}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

MyGigsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MyGigsTable;
