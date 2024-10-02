
import "./Success.css";

const Success = () => {
  return (
    <div className="success">
      <div className="container">
        <h1>Success!</h1>
        <p>Your order has been successfully placed.</p>
        <p>Thank you for your purchase!</p>
        <button onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    </div>
  );
};

export default Success;
