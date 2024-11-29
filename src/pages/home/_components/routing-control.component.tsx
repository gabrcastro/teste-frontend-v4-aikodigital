import L, { LatLngLiteral } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface RoutineMachineProps {
  allPositions: LatLngLiteral[];
}

const RoutingMachine = ({ allPositions }: RoutineMachineProps) => {
  const map = useMap();

  useEffect(() => {
    const waypoints = allPositions.map((position) =>
      L.latLng(position.lat, position.lng),
    );

    const routingControl = L.Routing.control({
      waypoints,
      summaryTemplate: "",
      lineOptions: {
        styles: [
          {
            color: "#757de8",
            weight: 2,
            opacity: 0.8,
          },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
      createMarker: () => null,
      show: false,
    });

    routingControl.addTo(map);

    // Cleanup para evitar múltiplas instâncias
    return () => {
      map.removeControl(routingControl);
    };
  }, [allPositions, map]);

  return null; // Este componente apenas adiciona o controle ao mapa
};

export default RoutingMachine;
