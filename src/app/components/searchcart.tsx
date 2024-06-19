
const searchcart = () => {
  return (
    <div>
      <div className="background-img ">
        <div className="text-bg  text-center pt-60">
          <h1 className="text-white  text-4xl  pb-3 font-bold">
            WELCOME TO TREK BOOKING
          </h1>
          <p className="text-white  text-2xl pb-3">
            Lorem ipsum dolor sit amet consectetur. Eget pellentesque congue
            eget amet vel <br></br> quam molestie bibendum.
          </p>
          <div className="intro flex justify-center pb-3">
            <div className="seure flex">
              <img className="" src="/image/check.png" alt="" />
              <p className="text-white font-bold ml-2 mb-1 font1rem">
                Secure payment
              </p>
            </div>
            <div className="seure flex mx-3">
              <img className="" src="/image/line.png" alt="" />
            </div>
            <div className="seure flex">
              <img className="" src="/image/clock.png" alt="" />
              <p className="text-white font-bold ml-2 mb-1  font1rem">
                Quick support
              </p>
            </div>
          </div>
          <div className="search-home flex justify-center pb-48">
            <div className="search-main  p-12 relative">
              <div className="input-text-search pb-3">
                <p className="text-left mb-0 font-bold pb-1">
                  City, destination, or hotel name
                </p>
                <img className="map-input" src="/image/map.png" alt="" />
                <input type="text" className="input-search" />
              </div>

              <div className="input-text-search pb-3 flex">
                <div className="p-text  justify-between padding-reponsive">
                  <p className="text-left mb-0 font-bold pb-1 ">Check-in</p>
                  <img
                    className="calender-input"
                    src="/image/calendar.png"
                    alt=""
                  />
                  <input type="text" className="input-search-in-out" />
                </div>
                <div className="p-text  justify-between ml-8">
                  <p className="text-left mb-0 font-bold pb-1">Check-out</p>
                  <img
                    className="calender-input-out"
                    src="/image/calendar.png"
                    alt=""
                  />
                  <input type="text" className="input-search-in-out" />
                </div>
              </div>
              <div className="input-text-search pb-4">
                <p className="text-left mb-0 font-bold pb-1">
                  Guests and Rooms
                </p>
                <img
                  className="userplus-input"
                  src="/image/userplus.png"
                  alt=""
                />
                <input type="text" className="input-search" />
              </div>
              <div className="input-text-search pb-3 text-right">
                <button className="btn-search-in mr-12">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default searchcart;
