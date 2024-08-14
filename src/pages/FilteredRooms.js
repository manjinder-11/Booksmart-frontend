import { useEffect, useState } from "react";

import RoomCard from "../components/RoomCard";
import Search from "../components/Search";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Rooms = () => {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationQuery = searchParams.get("location");

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/hotels/get?location=${locationQuery || ""}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (locationQuery) {
      fetchData();
    }
  }, [location.search]);

  return (
    <div className="md:px-8 lg:px-16 px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-10">
        <Search />
        {data && (
          <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center grid grid-cols-1 gap-4">
            {data.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
