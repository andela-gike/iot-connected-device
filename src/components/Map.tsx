import React, { FC, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { MAP_STYLE_URL } from '../constants';
import useOneMachine from '../customHooks/useOneMachine';
import MachineIcon from '../assets/machine.svg';

interface ViewPort {
  latitude: number;
  longitude: number;
  width: number | string;
  height: number | string;
  zoom: number
}

interface MachineEvent {
  timestamp: string,
  status: string
}

interface MapData {
  floor: number;
  id: string;
  install_date: string;
  last_maintenance: string
  latitude: number;
  longitude: number;
  machine_type: string;
  status: string;
  events? : Array<MachineEvent>
}
interface Props {
  viewPort: ViewPort,
  handleViewPortChange: (viewPort: ViewPort) => void;
  mapData : Array<MapData>
}

const MapComponent: FC<Props> = (
  { viewPort,
    handleViewPortChange, mapData }: Props) => {
  const [selectMachine, setSelectMachine] = useState<string | null>(null);
  const { isLoading, machineResult, error, setMachineResult } = useOneMachine(selectMachine)

  const handleGetOneMachine = (machineNumber: string) => {
    setSelectMachine(machineNumber)
  }

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={MAP_STYLE_URL}
        onViewportChange={viewPort => {
          handleViewPortChange(viewPort)
        }}
      >
        {mapData.map((machine) => (
          <Marker
            key={machine.id}
            latitude={machine.latitude}
            longitude={machine.longitude}>
            <button
              className="marker-button"
              onClick={() => handleGetOneMachine(machine.id)}
            >
              <img src={MachineIcon} alt="machine icon"/>
            </button>
          </Marker>
        ))}
        {/* {machineResult && !isLoading? (
          <Popup
            latitude={machineResult.latitude}
            longitude={machineResult.longitude}
          >
            <div>Park</div>
          </Popup>
        ) : null} */}
      </ReactMapGL>
    </div>
  )
};

export default MapComponent;
