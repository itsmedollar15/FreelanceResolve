const currentUser = () => {
    try {
      const userString = localStorage.getItem("currentUser");
      if (!userString) return null; // Return null if no user is found
      return JSON.parse(userString);
    } catch (error) {
      console.error("Failed to parse currentUser from localStorage:", error);
      return null;
    }
  };
  
  export default currentUser;
  