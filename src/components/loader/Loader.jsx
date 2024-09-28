//loader svg  import statement
import loaderSvg from "../../assets/loader.svg";

function Loader() {
  return (
    <>
      {/* we use the svg that we imported and we use animate spin from tailwind to 
     create the loading illusion*/}
      <h1 className="text-center text-green-600">Loading...</h1>
      <div className="flex justify-center items-center max-w-32 max-h-32 m-3">
        <div className="animate-spin">
          <img className="object-cover" src={loaderSvg} alt="Loading" />
        </div>
      </div>
    </>
  );
}

export default Loader;
