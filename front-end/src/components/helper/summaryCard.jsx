import React from 'react';
import GaugeChart from 'react-gauge-chart';

const SummaryCard = ({ label, value, total }) => {
  const tempValue = value;
  return (
    <div className="summary-card">
      <GaugeChart id="gauge-chart1" 
                  nrOfLevels={20} 
                  arcsLength={[0.3, 0.4, 0.3]} 
                  colors={['darkred', 'darkorange', 'green']} 
                  percent={total !== 0 ? value / total : 0} 
                  textColor='black'
                  needleBaseColor='black'
        arcPadding={0.02}
        formatTextValue={() => `${tempValue}`}
        style={{ width: '100%', color: 'black'}}
      />
    </div>
  );
};

export default SummaryCard;
