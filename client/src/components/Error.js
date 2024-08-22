import {useRouteError, Link} from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  //   if (error.status === 404) {
  //     return (
  //       <main>
  //         <div>
  //           <p>404</p>
  //           <h1>page not found</h1>
  //           <p>Sorry, we couldn't find the page you're looking for..</p>
  //           <div>
  //             <Link to="/">go back home</Link>
  //           </div>
  //         </div>
  //       </main>
  //     );
  //   }

  return (
    <main>
      <h4>There was an error</h4>
    </main>
  );
};
export default Error;
