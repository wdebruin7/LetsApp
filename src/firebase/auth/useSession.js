import {useContext} from 'react';
import {sessionContext} from '../sessionContext';

const useSession = () => {
  return useContext(sessionContext);
};

export default useSession;
