const profile = () => {
  return (
    <>
      <div className="container mt-10">
        <p className="text-center font-bold text-4xl">Manage Profile</p>
        <div className="flex w-3/4 m-auto pt-10"
        style={{borderBottom: "2px solid #D2D2D2"}}>
          <div className="flex items-start pr-10">
            <img src="/image/user.png" alt="" />
            <a href="#"
              className="text-hv font-semibold no-underline text-xl pl-2"
              style={{ color: "#305A61" }}
            >
              Account information
            </a>
          </div>
          <div className="flex items-start">
            <img src="/image/lock.png" alt="" />
            <a href="#" className="text-hv no-underline font-semibold text-black text-xl pl-2">Change password</a>
          </div>
        </div>
        
        

        <div className="my-10">
          <div
            className="w-3/4 border m-auto pt-9"
            style={{
              borderRadius: "20px",
              boxShadow: "1px 1px 8px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="w-4/5 m-auto" >
                <span className="text-xl font-semibold">Account information</span>
                <div style={{borderBottom: "2px solid #D2D2D2"}}></div>
                <div className="row pt-5">
                    <div className="col-md-6">
                        <p className="font-semibold">First name</p>
                        <input type="text" className="border w-full py-2" style={{borderRadius: "10px", borderColor: "#D2D2D2"}}/>
                    </div>
                    <div className="col-md-6">
                        <p className="font-semibold">Last name</p>
                        <input type="text" className="border w-full py-2" style={{borderRadius: "10px", borderColor: "#D2D2D2"}}/>
                    </div>
                </div>
                <div className="pt-5">
                    <p className="font-semibold">Username</p>
                    <input type="text" className="border w-full py-2" style={{borderRadius: "10px", borderColor: "#D2D2D2"}}/>
                </div>
                <div className="row pt-5">
                    <div className="col-md-6">
                        <p className="font-semibold">Phone number</p>
                        <input type="text" className="border w-full py-2" style={{borderRadius: "10px", borderColor: "#D2D2D2"}}/>
                    </div>
                    <div className="col-md-6">
                        <p className="font-semibold">Email</p>
                        <input type="text" className="border w-full py-2" style={{borderRadius: "10px", borderColor: "#D2D2D2"}}/>
                    </div>
                </div>
                <div className="pt-5">
                    <p className="font-semibold">Address</p>
                    <input type="text" className="border w-full py-2" style={{borderRadius: "10px", borderColor: "#D2D2D2"}}/>
                </div>
                <div className="flex justify-end pt-5 pb-4">
                    <button className=" text-white font-medium py-2 px-6 text-lg border" style={{backgroundColor: "#305A61", borderRadius: "20px"}}>Save</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default profile;
