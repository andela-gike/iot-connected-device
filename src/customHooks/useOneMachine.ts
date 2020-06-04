import { useEffect, useState } from 'react';
import axios from 'axios';
import {MACHINE_URL } from '../constants';

const useGetMachine = (machineId: string|null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [machineResult, setMachineResult] = useState([] as any);

  useEffect(() => {
    setIsLoading(true);
    setError(false)
    let cancel: () => void;
    axios({
      method: 'GET',
      url: `https://machinestream.herokuapp.com/api/v1/${MACHINE_URL}/${machineId}`,
      params: {
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setMachineResult((prevResult: any[]) => {
        return [...prevResult, ...res.data.data]
      })
      setIsLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [machineId])
  return {isLoading, error, machineResult, setMachineResult}
}

export default useGetMachine;