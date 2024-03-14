import { useNavigate } from "react-router-dom"


function ErrorPage({error}) {
    console.log(error);

    return (
        <div>ErrorPage</div>
    )
}

export default ErrorPage


// function ErrorPage() {
//     const [error, setError] = useState(null);

//     useEffect(() => {
//       getData()
//         .then((stuff) => {
//           // do stuff
//         })
//         .catch((err) => {
//           setError({ err });
//         });
//     }, []);
  
//     if (error) {
//       return <h1>ERROR</h1>
//     }
//     return <h2>NOT ERROR?</h2>
// }

// export default ErrorPage

{/* <ErrorComponent message={error.something.keyForTheErrorMessage} /> */}

{/* <Stuff /> */}