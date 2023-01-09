import React, { useEffect, useState, useCallback } from "react";
import MarketPlayerList from "./MarketPlayerList";
import Filters from "../../fantasy/bench/Filters";
import * as benchServices from "../../../services/squad.services";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayer,
  storeBenchInfo,
  storeTeamList,
  resetFilters,
} from "../../../features/fantasy/fantasySlice";
import * as teamServices from "../../../services/team.services";
import SelectedPlayerModal from "../SelectedPlayerModal";
import { BiQuestionMark } from "react-icons/bi";
import Loading from "../../../components/Loading";
import * as marketServices from "../../../services/market.services";

function MarketSquad({ setMarketSquad }) {
  const event = useSelector((state) => state.user.event);
  const token = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(true);
  const fantasyState = useSelector((state) => state.fantasy);
  const [selectedPlayer, setSelectedPlayer] = useState();

  const dispatch = useDispatch();

  const createAuction = async (initialValue, directPurchase, playerId) => {
    try {
      setIsLoading(true);
      await marketServices.addAuction(token, {
        initialValue,
        directPurchase,
        event,
        playerId,
      });
      await fetchBench();
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBench = useCallback(
    async () => {
      try {
        const data = await benchServices.fetchBench(
          token,
          event,
          fantasyState.bench.teamFilter,
          fantasyState.bench.positionFilter,
          fantasyState.bench.playerNameSearch,
          fantasyState.bench.paginate.page
        );
        const teamList = await teamServices.fetchTeamsList(token, event);
        dispatch(storeTeamList(teamList));
        dispatch(storeBenchInfo(data));
        setIsLoading(false);
      } catch (e) {
        alert(e.message);
      }
    },
    [
      token,
      event,
      dispatch,
      fantasyState.bench.teamFilter,
      fantasyState.bench.positionFilter,
      fantasyState.bench.playerNameSearch,
      fantasyState.bench.paginate.page,
      fantasyState.insertedPlayer,
      fantasyState.removedPlayer,
    ],
  )
  

  useEffect(() => {
    fetchBench();
  }, [fetchBench]);

  if (isLoading)
    return (
      <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-25 z-30">
        <Loading />
      </div>
    );

  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-80 z-30 flex justify-center items-center">
      {!selectedPlayer ? (
        <div className="md:w-5/12 w-11/12 md:h-[90%] h-1/2 bg-[#647B80] rounded-t">
          <header className="w-full bg-[#EAEAEA] h-[20%] flex flex-col justify-center rounded-t drop-shadow-2xl pt-2">
            <div className="w-full flex justify-between">
              <h1 className="w-1/5 text-center text-offside-titles text-xl font-semibold">
                Almacén
              </h1>
              <div className="w-1/5 flex items-center justify-around">
                <button className="rounded-full bg-gradient-offside p-[2px]">
                  <BiQuestionMark size="1.3rem" color="white" />
                </button>
                <button
                  className="text-xl font-semibold opacity-60"
                  onClick={() => {
                    setMarketSquad(false);
                  }}
                >
                  X
                </button>
              </div>
            </div>

            <Filters dispatch={dispatch} />
          </header>
          <MarketPlayerList setSelectedPlayer={setSelectedPlayer} />
        </div>
      ) : (
        <SelectedPlayerModal
          player={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          setMarketSquad={setMarketSquad}
          createAuction={createAuction}
        />
      )}
    </div>
  );
}

export default MarketSquad;
