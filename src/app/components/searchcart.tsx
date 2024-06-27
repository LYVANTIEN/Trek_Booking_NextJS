import { countries, cities } from "country-cities";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const handleEvent = <T extends HTMLElement>(
  handler: (event: React.ChangeEvent<T>) => void
) => {
  return (event: React.ChangeEvent<FormControlElement>) => {
    handler(event as unknown as React.ChangeEvent<T>);
  };
};

const Searchcart = () => {
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");

  useEffect(() => {
    const loadCountries = async () => {
      const allCountries = await countries.all();
      setCountriesList(allCountries);
    };
    loadCountries();
  }, []);

  const handleCountryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const countryCode = event.target.value;
    console.log("Fetched country: ", countryCode);
    setSelectedCountry(countryCode);
    const city = await cities.getByCountry(countryCode);
    console.log("Fetched cities: ", city);
    setCitiesList(city || []);
    setSelectedCity("");
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityCode = event.target.value;
    setSelectedCity(cityCode);
  };

  const handleCheckInDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutDate(event.target.value);
  };

  return (
    <div>
      <div className="background-img">
        <div className="text-bg text-center pt-60">
          <h1 className="text-white text-4xl pb-3 font-bold">
            WELCOME TO TREK BOOKING
          </h1>
          <p className="text-white text-2xl pb-3">
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
              <p className="text-white font-bold ml-2 mb-1 font1rem">
                Quick support
              </p>
            </div>
          </div>
          <div className="search-home flex justify-center pb-48">
            <div className="search-main p-12 relative">
              <div className="input-text-search pb-3">
                <p className="text-left mb-0 font-bold pb-1">
                  <Form.Control
                    as="select"
                    value={selectedCountry}
                    onChange={handleEvent<HTMLSelectElement>(handleCountryChange)}
                  >
                    <option value="">Select Country</option>
                    {countriesList.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Control>
                </p>
              </div>
              <div className="input-text-search pb-3">
                <p className="text-left mb-0 font-bold pb-1">
                  <Form.Control
                    as="select"
                    value={selectedCity}
                    onChange={handleEvent<HTMLSelectElement>(handleCityChange)}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select City</option>
                    {citiesList.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Control>
                </p>
              </div>
              <div className="input-text-search pb-3 flex">
                <div className="p-text justify-between padding-reponsive">
                  <p className="text-left mb-0 font-bold pb-1">Check-in</p>
                  <input 
                    type="date" 
                    className="input-search-in-out" 
                    value={checkInDate} 
                    onChange={handleCheckInDateChange} 
                  />
                </div>
                <div className="p-text justify-between ml-8">
                  <p className="text-left mb-0 font-bold pb-1">Check-out</p>
                  <input 
                    type="date" 
                    className="input-search-in-out" 
                    value={checkOutDate} 
                    onChange={handleCheckOutDateChange} 
                  />
                </div>
              </div>
              <div className="input-text-search pb-3 text-right">
                <Link
                  href={`/trekbooking/hotel_schedule?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&city=${selectedCity}`}
                  className="text-white font-medium py-2 px-6 text-lg border no-underline"
                  style={{
                    backgroundColor: "#305A61",
                    borderRadius: "20px",
                  }}
                >
                  Book now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchcart;
