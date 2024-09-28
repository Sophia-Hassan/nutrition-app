//footer for the app
function Footer() {
  return (
    <div className="font-[sans-serif] ">
      {/*container for the footer that includes copyright statement
             as well as attribution to edamam as required */}
      <div className="flex flex-row justify-center items-center max-w-full bg-green-800">
        <span className="m-6 text-green-50">copyright 2024©</span>
        <div id="edamam-badge" data-color="transparent"></div>
      </div>
    </div>
  );
}
export default Footer;
