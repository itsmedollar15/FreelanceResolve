// Initial state for the gig
export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id || null,
  title: "",
  cat: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

// Reducer function for managing gig state
export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      // Handle input changes
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "ADD_IMAGES":
      // Add cover and images to the state
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    case "ADD_FEATURE":
      // Add a new feature to the features array
      return {
        ...state,
        features: [...state.features, action.payload],
      };

    case "REMOVE_FEATURE":
      // Remove a feature from the features array
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state; // Return the current state for unknown actions
  }
};
