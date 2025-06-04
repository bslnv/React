import React from 'react';
import FishingSpot from '../components/FishingSpot';

const HomePage = ({ spotsData, fallbackFishData, addNotification }) => {
  if (!spotsData || spotsData.length === 0) {
    return null; 
  }

  return (
    <>
      {spotsData.map(spot => (
        <FishingSpot
          key={spot.id}
          spotName={spot.spotName}
          environmentDescription={spot.environmentDescription}
          maxLogCapacity={spot.maxLogCapacity}
          initialFishTypes={spot.customFishTypes && spot.customFishTypes.length > 0 ? spot.customFishTypes : fallbackFishData}
          notify={addNotification}
        />
      ))}
    </>
  );
};

export default HomePage;