"use client";
import React, { useEffect, useState } from "react";
import tourService from "@/app/services/tourService";
import CreateTourImage from "@/app/components/TourImages/CreateTourImage";
import tourImageService from "@/app/services/tourImageService";
import { ref, deleteObject } from "firebase/storage";
import { analytics } from "../../../../../../public/firebase/firebase-config";

const ListTourImage = ({ params }: { params: { tourId: string } }) => {
  const [showTourImageCreate, setShowTourImageCreate] = useState<boolean>(false);
  const [listTourImage, setTourImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourId, setTourId] = useState(0);

  const handleCreateTourImage = async () => {
    setShowTourImageCreate(false);
    if (params.tourId) {
      tourService
        .getTourImageByTourId(Number(params.tourId))
        .then((data: any) => {
          setTourImage(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tour images:", error);
          setError(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (params.tourId) {
      tourService
        .getTourImageByTourId(Number(params.tourId))
        .then((data: any) => {
          setTourImage(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tour images:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [params.tourId]);

  const deleteImageButtonHandler = (tourImageId: number, imageUrl: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      handleDeleteTourImage(tourImageId, imageUrl);
    }
  };

  const deleteImageFromStorage = async (imageUrl: string) => {
    try {
      const storageRef = ref(analytics, imageUrl);
      await deleteObject(storageRef);
      console.log("Image deleted successfully from Firebase Storage");
    } catch (error) {
      console.error("Error deleting image from Firebase Storage:", error);
    }
  };

  const handleDeleteTourImage = async (tourImageId: number, imageUrl: string) => {
    try {
      console.log("Deleting tour image with ID:", tourImageId);
      await deleteImageFromStorage(imageUrl);
      await tourImageService.deleteTourImage(tourImageId);
      console.log("Tour image deleted successfully");

      if (params.tourId) {
        tourService
          .getTourImageByTourId(Number(params.tourId))
          .then((data: any) => {
            setTourImage(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching tour images:", error);
            setError(error);
            setLoading(false);
          });
      }

      alert("Tour image deleted successfully");
    } catch (error) {
      console.error("Error deleting tour image:", error);
      alert("Failed to delete tour image");
    }
  };

  const handleAddImage = () => {
    if (listTourImage.length >= 6) {
      alert("You can only add up to 6 images for this tour.");
      return;
    }
    setTourId(Number(params.tourId));
    setShowTourImageCreate(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tour images</div>;
  }

  return (
    <div className="relative">
      <div className="search-add">
        <div className="search-hotel flex">
          <input
            type="text"
            placeholder="Search........."
            className="input-hotel pl-3"
          />
          <img src="/image/search.png" alt="" />
        </div>
        <button className="ml-8 button-add ml-4rem" onClick={handleAddImage}>
          + Add Image Tour
        </button>
      </div>
      <div className="table-hotel pt-8">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white border-solid">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bk-top-table">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-4">
                        TourImageId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        TourImageURL
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listTourImage.length > 0 ? (
                      listTourImage.map((item: ITourImage, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-200 dark:border-white/10 text-center"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.tourImageId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold flex justify-center">
                            <img
                              className="max-w-[180px] max-h-[180px]"
                              src={
                                item.tourImageURL
                                  ? item.tourImageURL
                                  : "/image/imagedefault.png"
                              }
                              alt=""
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/image/imagedefault.png";
                              }}
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            <div className="flex justify-center">
                              <img
                                className="w-5 h-5 cursor-pointer ml-3"
                                src="/image/unlock.png"
                                alt="Delete"
                                onClick={() =>
                                  deleteImageButtonHandler(item.tourImageId, item.tourImageURL)
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No TourImage found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateTourImage
        showTourImageCreate={showTourImageCreate}
        setShowTourImageCreate={setShowTourImageCreate}
        onCreate={handleCreateTourImage}
        tourId={tourId}
        listTourImage={listTourImage.length}
      />
    </div>
  );
};

export default ListTourImage;
