import React, { FC, useState } from 'react';
import useMachines from '../customHooks/useGetMachines';
import MapDisplay from './Map';
import '../App.scss';

const App: FC = () => {
  const { isLoading, machineResult, error, setMachineResult } = useMachines();
  const [viewPort, setViewPort] = useState({
    latitude: 11.523869432452495,
    longitude: 48.09535029616455,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })
  console.log(machineResult)
  const viewPortChange = (newViewPort: any) => {
    console.log('here', viewPort);
    setViewPort(newViewPort)
  }
  return (
    <div className="App">
      {!isLoading && <MapDisplay
        mapData={machineResult}
        viewPort={viewPort}
        handleViewPortChange={() => viewPortChange(viewPort)} />}
    </div>
  );
}

export default App;
