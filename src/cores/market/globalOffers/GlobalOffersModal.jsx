import React from "react";
import MarketModal from "../MarketModal";
import { TbCurrencyDollar } from "react-icons/tb";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

function GlobalOffersModal({ setGlobalOffersModal }) {
  return (
    <MarketModal>
      <div className="flex flex-col justify-evenly w-full h-full pt-5">
        <div className="w-full flex justify-around text-offside-titles">
          <div className="flex flex-col items-center">
            <span className="font-semibold">Oferta ganadora actual</span>
            <h1 className="flex text-xl font-bold items-center gap-1">
              <TbCurrencyDollar
                size="1.4rem"
                color="white"
                className="bg-gradient-offside rounded-full p-[1px]"
              />
              50
            </h1>
          </div>
          <div className="flex items-end justify-end w-2/6">
            <div className="flex flex-col items-center">
              <span className="font-semibold">Mi oferta</span>
              <label
                htmlFor=""
                className="bg-gradient-offside p-[1px] rounded-full"
              >
                <input
                  type="number"
                  placeholder=""
                  className="appearance-none rounded-full text-center text-xl w-full p-1 text-offside-titles font-bold outline-none"
                />
              </label>
            </div>
            <h1 className="h-4/6 flex items-center text-[#00DB71] text-xl font-bold">
              (+
              <RiMoneyDollarCircleFill />
              150)
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col items-center text-offside-titles">
          <span className="font-semibold">Saldo luego de la recuperación</span>
          <h1 className="flex text-xl font-bold items-center gap-1">
            <TbCurrencyDollar
              size="1.4rem"
              color="white"
              className="bg-gradient-offside rounded-full p-[1px]"
            />
            250
          </h1>
        </div>
        <div className="w-full flex justify-evenly">
          <span className="bg-gradient-offside p-[1px] rounded-full">
            <button
              className="bg-white rounded-full py-1 px-14"
              onClick={() => {
                setGlobalOffersModal(false);
              }}
            >
              <h1 className="text-offside-gradient font-semibold ">Cancelar</h1>
            </button>
          </span>
          <button className="bg-gradient-offside rounded-full text-white font-semibold py-1 px-14">
            Aceptar
          </button>
        </div>
      </div>
    </MarketModal>
  );
}

export default GlobalOffersModal;