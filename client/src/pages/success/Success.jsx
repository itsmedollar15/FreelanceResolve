import "./Success.css";

const Success = () => {
  return (
    <div className="success">
      <div className="container">
        <h1 className="success-title">Success!</h1>
        <p className="success-message">Your order has been successfully placed.</p>
        <p className="success-thank-you">Thank you for your purchase!</p>
        <button className="success-button" onClick={() => window.location.href = '/'}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
