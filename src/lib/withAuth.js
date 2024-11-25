// src/components/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` for loading state

    useEffect(() => {
      // Check for token in localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        // If no token, redirect to login page
        router.push('/login');
      } else {
        // If token is present, allow rendering
        setIsAuthenticated(true);
      }
    }, [router]);

    // Display a loading state while checking for authentication
    if (isAuthenticated === null) {
      return <p>Loading...</p>; // You can replace this with a custom loading component
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
