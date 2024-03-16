import { NextPage } from "next";
import { Room } from "./Room";
import CollaborativeApp from "@/components/liveblocks/CollaborativeApp";

const Homepage: NextPage = () => {
  return (
    <Room>
      <CollaborativeApp />
    </Room>
  )
}

export default Homepage;