import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as inventoryServices from "../../services/inventory.services";
import { putSticker } from "../../features/album/albumSlice";

function EmptySlot({ stickerInfo }) {
  const album = useSelector((state) => state.album);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const isSelectedStyles = album.selectedSticker
    ? "bg-[#3D405B] w-full h-full flex flex-col justify-center items-center cursor-pointer"
    : "bg-[#3D405B] w-full h-full flex flex-col justify-center items-center";

  const claimSticker = async (eventId, stickerId) => {
    try {
      if (album.selectedSticker === stickerInfo.id)
        await inventoryServices.claimSticker(token, eventId, stickerId);
      dispatch(putSticker());
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div
      className={isSelectedStyles}
      onClick={() => claimSticker(album.eventId, stickerInfo.id)}
    >
      <p className="text-white font-semibold text-center">
        {stickerInfo.playerName}
      </p>
      <p className="text-white font-semibold">{stickerInfo.id}</p>
    </div>
  );
}

export default EmptySlot;
