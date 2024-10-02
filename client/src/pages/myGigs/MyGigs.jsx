import { Link } from "react-router-dom";
import "./MyGigs.css";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import MyGigsTable from "./MyGigsTable"; // New component for table logic

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>My Gigs</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        {isLoading ? (
          <p className="loading">Loading your gigs...</p>
        ) : error ? (
          <p className="error">Something went wrong! Please try again later.</p>
        ) : (
          <MyGigsTable data={data} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default MyGigs;
