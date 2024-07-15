"use client";
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

  const handleCheckInDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckOutDate(event.target.value);
  };

  return (
    <div className="background-img">
      <div className="text-bg text-center pt-60">
        <h1 className="text-white text-4xl pb-3 font-bold">
          WELCOME TO TREK BOOKING
        </h1>
        <p className="text-white text-3xl pb-3 font-bold">
          Your satisfaction is our mission
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
        <div className="search-home block justify-center pb-48">
          <div className="search-main p-12 relative w-3/4 m-auto">
            <Form>
              <div className="row">
                <Form.Group
                  controlId="countrySelect"
                  className="col-6 text-left"
                >
                  <Form.Label className="font-semibold lg:text-lg cam ml-1 ">
                    Country
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCountry}
                    onChange={handleEvent(handleCountryChange)}
                  >
                    <option value="">Select Country</option>
                    {countriesList.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="citySelect" className="col-6 text-left">
                  <Form.Label className="font-semibold lg:text-lg cam ml-1  ">
                    City
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCity}
                    onChange={handleEvent(handleCityChange)}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select City</option>
                    {citiesList.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group controlId="checkInDate" className="col-6 text-left">
                  <Form.Label className="font-semibold lg:text-lg cam ml-1  pt-2 ">
                    Check-in Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={handleCheckInDateChange}
                  />
                </Form.Group>
                <Form.Group
                  controlId="checkOutDate"
                  className="col-6 text-left"
                >
                  <Form.Label className="font-semibold lg:text-lg cam ml-1  pt-2 ">
                    Check-out Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={handleCheckOutDateChange}
                  />
                </Form.Group>
              </div>
              <div className="flex justify-end mt-4">
                <a
                  href={`/trekbooking/search?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&city=${selectedCity}`}
                  className={`button-add mt-2 text-decoration-none ${
                    !(selectedCity && checkInDate && checkOutDate)
                      ? "disabled"
                      : ""
                  }`}
                  onClick={(e) =>
                    !(selectedCity && checkInDate && checkOutDate) &&
                    e.preventDefault()
                  }
                >
                  Search
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchcart;
