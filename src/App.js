import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiExample = () => {
  const url = 'http://sawacpapi.runasp.net'
  const [loggers, setLoggers] = useState([]);
  const [newLogger, setNewLogger] = useState({
    id: '',
    longtitude: 0,
    latitude: 0,
    name: ''
  });
  const [IDLogger, setIDLogger] = useState('')
  const [LoggerGetById, setLoggerGetById] = useState({})
  const [LoggerUpdate, setLoggerUpdate] = useState({
  })

  const [arrStolenLine, setArrStolenLine] = useState([])
  const [IdLoggerStolenLine, setIdLoggerStolenLine] = useState('')
   

  // Fetch all loggers
  const fetchLoggers = async () => {
    try {
      const response = await axios.get(`${url}/Logger/GetAllLoggers`);
      setLoggers(response.data);
    } catch (error) {
      console.error('Error fetching loggers:', error);
    }
  };

  // Create a new logger
  const createLogger = async () => {
    try {
      await axios.post(`${url}/Logger/CreateNewLogger`, newLogger);
      fetchLoggers(); // Refresh the list after creation
    } catch (error) {
      console.error('Error creating logger:', error);
    }
  };
  // Post StolenLine
  const StolenLineAuCo = [{
    latitude: 10.771416308121902,
    longtitude : 106.65019879872312,
    timestamp: '2024-07-18T06:14:04.6027226'
  },
  {
    latitude: 10.771153882025505,
    longtitude : 106.65037238719138,
    timestamp: '2024-07-18T06:14:04.6027226'
  },
  {
    latitude: 10.770684860129196,
    longtitude : 106.65071036919261,
    timestamp: '2024-07-18T06:14:04.6027226'
  },
  {
    latitude: 10.769999770653502,
    longtitude : 106.6512307541786,   
    timestamp: '2024-07-18T06:14:04.6027226'
  }
  ]
  const StolenLineToHienThanh = [{
    latitude: 10.772317446013858,
    longtitude: 106.66039153724938,
    timestamp: "2024-08-06T06:39:14.353"    
  },  
  {
    latitude:   10.772560943331895,
    longtitude: 106.66062390687044,
    timestamp:   "2024-08-06T06:39:14.353"
  },
  {
    latitude: 10.77406285544967,
    longtitude: 106.66175583551183,
    timestamp: "2024-08-06T06:39:14.353"
  },
  {
    latitude: 10.776091742379316,
    longtitude: 106.66333299244332,
    timestamp: "2024-07-18T06:14:04.6027226"     
  }
  ]

  const postStolenLine = async (ob) => {
    try {
      await axios.post(`${url}/StolenLine/AddStolenLine`, {
        loggerId: 'c01b',   
        longtitude: ob.longtitude,
        latitude: ob.latitude,
        timestamp: ob.timestamp
      }
      );      
    } catch (error) {
      console.error('Error creating logger:', error);
    }
  };

  // Delete a logger by ID
  const deleteLogger = async (loggerId) => {
    try {
      await axios.delete(`${url}/Logger/DeleteLogger/Id=${loggerId}`);
      fetchLoggers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting logger:', error);
    }
  };

  const deleteStolenLineToHienThanh = async () => {
    try {
      await axios.delete(`${url}/StolenLine/DeleteStolenLineByLoggerId/LoggerId=39fc`);
      
    } catch (error) {
      console.error('Error deleting logger:', error);
    }
  };
  const deleteStolenLineAuCo = async () => {
    try {
      await axios.delete(`${url}/StolenLine/DeleteStolenLineByLoggerId/LoggerId=c01b`);
      
    } catch (error) {
      console.error('Error deleting logger:', error);
    }
  };

  const getLoggerById = async (Id) => {
    try {
      const response = await axios.get(`${url}/Logger/GetLoggerById?Id=${Id}`);
      setLoggerGetById(response.data)
      
    } catch (error) {
      console.error('Error deleting logger:', error);
    }
  };

  const getLoggerWantUpdate = async (Id) => {
    try {
      const response = await axios.get(`${url}/Logger/GetLoggerById?Id=${Id}`);
      setLoggerUpdate(response.data)
      
    } catch (error) {
      console.error('Error deleting logger:', error);
    }
  };

  const UpdateLoggerById = async () => {
    try {   
        const response = await axios.patch(`${url}/Logger/UpdateLoggerStatus/Id=${LoggerUpdate.id}`,
          {       
              longtitude: LoggerUpdate.longtitude,
              latitude: LoggerUpdate.latitude,
              name: LoggerUpdate.name,
              battery: LoggerUpdate.battery,
              temperature:LoggerUpdate.temperature,   
              stolen: LoggerUpdate.stolen,
              bluetooth: LoggerUpdate.bluetooth,
              timeStamp: LoggerUpdate.timeStamp     
          }      
        );
        
        fetchLoggers()
       
      
    } catch (error) {
      console.error('Error update logger:', error);
    }
  };

  const getStolenLineById = async (Id) => {
    try {
      const response = await axios.get(`${url}/StolenLine/GetStolenLineByLoggerId?LoggerId=${Id}`);
      setArrStolenLine(response.data)
    } catch (error) {
      console.error('Error deleting logger:', error);
    }
  };

  const handleGetStolenLineById = (ID) =>{
        getStolenLineById(ID)
  }

  const handleGetById = (Id) =>{
    getLoggerById(Id)    
  }
  // Fetch all loggers on component mount
  useEffect(() => {
    fetchLoggers();
  }, []);



const [isChecked, setIsChecked] = useState(false);

const handleCheckboxChange = (event) => {
  setIsChecked(event.target.checked)
  setLoggerUpdate({  ...LoggerUpdate, stolen : event.target.checked});
};

const updateLoggerById = (id) =>{
      getLoggerWantUpdate(id)
}

const UpdateLoggerToHienThanh = async () => {
  
  try {   
      const response = await axios.patch(`${url}/Logger/UpdateLoggerStatus/Id=c01b`,
        {       
            longtitude: 106.66333299244332,
            latitude: 10.776091742379316,
            name: "Tô Hiến Thành",
            battery: 25,
            temperature: '30',   
            stolen: true,  
            bluetooth: 'OFF',
            timeStamp: '2024-07-18T06:14:04.6027226'
        }
      );
  } catch (error) {
    console.error('Error update To Hien Thanh logger:', error);
  }
};
const UpdateLoggerAuco = async () => {
  
  try {   
      const response = await axios.patch(`${url}/Logger/UpdateLoggerStatus/Id=c01b`,
        {       
            longtitude: 106.6512307541786,
            latitude: 10.769999770653502,
            name: "Âu Cơ",
            battery: 25,
            temperature: '30',   
            stolen: true,  
            bluetooth: 'OFF',
            timeStamp: '2024-07-18T06:14:04.6027226'
        }
      );
  } catch (error) {
    console.error('Error update Au Co logger:', error);
  }
};
const UpdateLoggerToHienThanhToNormal = async () => {
  
  try {   
      const response = await axios.patch(`${url}/Logger/UpdateLoggerStatus/Id=39fc`,
        {       
            longtitude: 106.66039153724938,
            latitude: 10.772317446013858,
            name: "Tô Hiến Thành",
            battery: 25, 
            temperature: '30',  
            stolen: false,  
            bluetooth: 'OFF',
            timeStamp: '2024-07-18T06:14:04.6027226'
        }
      );
  } catch (error) {
    console.error('Error update to normal To Hien Thanh logger:', error);
  }
};
const UpdateLoggerAuCoToNormal = async () => {
  
  try {   
      const response = await axios.patch(`${url}/Logger/UpdateLoggerStatus/Id=c01b`,
        {       
            longtitude:  106.65019879872312,
            latitude: 10.771416308121902,
            name: "Âu Cơ",
            battery: 25, 
            temperature: '30',
            stolen: false,  
            bluetooth: 'OFF',
            timeStamp: '2024-07-18T06:14:04.6027226'
        }
      );
  } catch (error) {
    console.error('Error update to normal To Hien Thanh logger:', error);
  }
};



// const handlePostStolenLineToHienThanh = () => {
  
//   UpdateLoggerToHienThanh()

//   for (let i = 0; i < StolenLineToHienThanh.length; i++) {
//       postStolenLine(StolenLineToHienThanh[i])
//   }
  
// }
const handlePostStolenLineToHienThanh = async () => {
  try {
    // Cập nhật thông tin của logger Tô Hiến Thành
    await UpdateLoggerToHienThanh();

    // Gửi các thông tin đường trộm lên server tuần tự
    for (const stolenLine of StolenLineToHienThanh) {
      await postStolenLine(stolenLine);
    }
    
  } catch (error) {
    console.error('Error posting stolen lines:', error);
  }
};
const handlePostStolenLineAuCo = async () => {
  try {
    // Cập nhật thông tin của logger Tô Hiến Thành
    await UpdateLoggerAuco();

    // Gửi các thông tin đường trộm lên server tuần tự
    for (const stolenLine of StolenLineAuCo) {
      await postStolenLine(stolenLine);
    }
    
  } catch (error) {
    console.error('Error posting stolen lines:', error);
  }
};


const handleDeleteStolenLineToHienThanh = () => {
      UpdateLoggerToHienThanhToNormal()
      deleteStolenLineToHienThanh()
}
const handleDeleteStolenLineAuCo = () => {
      UpdateLoggerAuCoToNormal()
      deleteStolenLineAuCo()
}

  // console.log('LoggerGetById', LoggerGetById)
  console.log('LoggerUpdate', LoggerUpdate)
  // console.log('arrStolenLine', arrStolenLine)

  return (
    <div>
      <h1>Loggers</h1>

      <button
              onClick={handlePostStolenLineAuCo}
      
      >Post SlolenLine Auco</button>

      <button
              onClick={handleDeleteStolenLineAuCo}
      
      >Delete SlolenLine Auco</button>

      
      <ul>
        {loggers.map(logger => (
          <li key={logger.id}>
            {logger.name} (ID: {logger.id}, Lat: {logger.latitude}, Lng: {logger.longtitude}, battery: {logger.battery}, temperature: {logger.temperature}  )
            
            
            <button onClick={() => deleteLogger(logger.id)}>Delete</button>
            <button onClick={() => updateLoggerById(logger.id)}>Update</button>
          </li>
        ))}
      </ul>

      <h2>Create New Logger</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        createLogger();
      }}>
        <input
          type="text"
          placeholder="ID"
          value={newLogger.id}
          onChange={(e) => setNewLogger({ ...newLogger, id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Latitude"
          value={newLogger.latitude}
          onChange={(e) => setNewLogger({ ...newLogger, latitude: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Longtitude"
          value={newLogger.longtitude}
          onChange={(e) => setNewLogger({ ...newLogger, longtitude: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newLogger.name}
          onChange={(e) => setNewLogger({ ...newLogger, name: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>


      <h2>Get Logger By ID</h2>
       <div>    
        <input
          type="text"
          placeholder="Id"
          value={IDLogger}
          onChange={(e) => setIDLogger(e.target.value )}
        />
        <button
            onClick={() => handleGetById(IDLogger)}
        >Get ID</button>     
      </div>

      <h2>Get StolenLine By ID</h2>
        <div>    
          <input
            type="text"
            placeholder="Id"
            value={IdLoggerStolenLine}
            onChange={(e) => setIdLoggerStolenLine(e.target.value )}
          />
          <button
              onClick={() => handleGetStolenLineById(IdLoggerStolenLine)}
          >Get StolenLine</button>     
        </div>

      <h2>Post StolenLine Tô Hiến Thành By ID</h2>
        <div>    
          <button
              onClick={handlePostStolenLineToHienThanh}
          >Post StolenLine</button>     
        </div>
      <h2>Delete StolenLine Tô Hiến Thành By ID</h2>
        <div>    
          <button
              onClick={handleDeleteStolenLineToHienThanh}
          >Delete StolenLine</button>     
        </div>

      <h2>Update Logger By ID</h2>
      <div>
        <input
          type="text"
          placeholder="Id"
          value={LoggerUpdate.id}
         
        />
        <input
          type="text"
          placeholder="Name"
          value={LoggerUpdate.name}
          onChange={(e) => setLoggerUpdate({ ...LoggerUpdate, name : e.target.value })}
        />
        <input
          type="number"
          placeholder="Lat"
          value={LoggerUpdate.latitude}
          onChange={(e) => setLoggerUpdate({ ...LoggerUpdate, latitude : parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Lng"
          value={LoggerUpdate.longtitude}
          onChange={(e) => setLoggerUpdate({ ...LoggerUpdate, longtitude : parseFloat(e.target.value)})}
        />
        <input
          type="number"
          placeholder="Battery"
          value={LoggerUpdate.battery}
          onChange={(e) => setLoggerUpdate({ ...LoggerUpdate, battery : parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Temperature"
          value={LoggerUpdate.temperature}
          onChange={(e) => setLoggerUpdate({ ...LoggerUpdate, temperature :  e.target.value })}
        />
        <input
          type="text"
          placeholder="Bluetooth"
          value={LoggerUpdate.bluetooth}
          onChange={(e) => setLoggerUpdate({ ...LoggerUpdate, bluetooth : e.target.value })}
        />
       <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button
            onClick={UpdateLoggerById}
        >Update</button>     
      </div>
    </div>
  );
};

export default ApiExample;
