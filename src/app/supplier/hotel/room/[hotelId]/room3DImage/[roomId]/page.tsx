"use client";
import React, { useEffect, useState } from "react";
import tourService from "@/app/services/tourService";
import roomImageService from "@/app/services/roomImageService";
import { ref, deleteObject } from "firebase/storage";
import { analytics } from "../../../../../../../../public/firebase/firebase-config";
import roomService from "@/app/services/roomService";
import CreateRoom3DImage from "@/app/components/Room3DImages/Create3DRoomImage";
import room3DImageService from "@/app/services/room3DImageService";

const ListRoomImage = ({ params }: { params: { roomId: string } }) => {
  const [showRoomImageCreate, setShowRoomImageCreate] = useState<boolean>(false);
  const [listRoomImage, setRoomImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState(0);

  const handleCreateRoomImage = async () => {
    setShowRoomImageCreate(false);
    if (params.roomId) {
      room3DImageService
        .getRoom3DImageByRoomId(Number(params.roomId))
        .then((data: any) => {
          setRoomImage(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching room 3D images:", error);
          setError(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (params.roomId) {
        room3DImageService
          .getRoom3DImageByRoomId(Number(params.roomId))
          .then((data: any) => {
            setRoomImage(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching room images:", error);
            setError(error);
            setLoading(false);
          });
      }
  }, [params.roomId]);

  const deleteImageButtonHandler = (roomImageId: number, imageUrl: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      handleDeleteRoomImage(roomImageId, imageUrl);
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

  const handleDeleteRoomImage = async (roomImageId: number, imageUrl: string) => {
    try {
      console.log("Deleting room image with ID:", roomImageId);
      await deleteImageFromStorage(imageUrl);
      await room3DImageService.deleteRoom3DImage(roomImageId);
      console.log("Room 3D image deleted successfully");

      if (params.roomId) {
        room3DImageService
          .getRoom3DImageByRoomId(Number(params.roomId))
          .then((data: any) => {
            setRoomImage(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching room 3D images:", error);
            setError(error);
            setLoading(false);
          });
      }

      alert("Room 3D image deleted successfully");
    } catch (error) {
      console.error("Error deleting room 3D image:", error);
      alert("Failed to delete room 3D image");
    }
  };

  const handleAddImage = () => {
    if (listRoomImage.length >= 6) {
      alert("You can only add up to 6 images for this tour.");
      return;
    }
    setRoomId(Number(params.roomId));
    setShowRoomImageCreate(true);
  };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading room 3D images</div>;
//   }

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
          + Add Room 3D Image
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
                        Room3DImageId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Room3DImageURL
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRoomImage.length > 0 ? (
                      listRoomImage.map((item: any, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-200 dark:border-white/10 text-center"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.roomImage3DId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold flex justify-center">
                            <img
                              className="max-w-[180px] max-h-[180px]"
                              src={
                                item.roomImage3DURL
                                  ? item.roomImage3DURL
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
                                  deleteImageButtonHandler(item.roomImage3DId, item.roomImage3DURL)
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
                          No Room3DImage found
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
      <CreateRoom3DImage
        showRoomImageCreate={showRoomImageCreate}
        setShowRoomImageCreate={setShowRoomImageCreate}
        onCreate={handleCreateRoomImage}
        roomId={roomId}
        listRoomImage={listRoomImage.length}
      />
    </div>
  );
};

export default ListRoomImage;
