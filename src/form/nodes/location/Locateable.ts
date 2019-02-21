import NodeLocation from "./NodeLocation";

interface Locateable {
  setLocation(location: NodeLocation): Locateable;

  getLocation(): NodeLocation;
}

export default Locateable;