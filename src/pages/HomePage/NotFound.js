import { useHistory } from 'react-router';

const NotFound = () => {
  const history = useHistory()
  
  return (
    <div class="d-flex justify-content-center align-items-center" id="not-found">
      <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">
        404
      </h1>
      <div class="inline-block align-middle">
        <h2 class="font-weight-normal lead" id="desc">
          The page you requested was not found.
        </h2>
      </div>
      <button type="button" className="primary-button" onClick={() => history.push("/")}>Go Home</button>
    </div>
  );
};

export default NotFound;
