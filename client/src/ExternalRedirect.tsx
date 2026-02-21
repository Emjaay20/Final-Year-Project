const ExternalRedirect = ({ url }) => {
    useEffect(() => {
      window.location.href = url;
    }, [url]);
  
    return <p>Redirecting...</p>;
  };
  
  export default ExternalRedirect;