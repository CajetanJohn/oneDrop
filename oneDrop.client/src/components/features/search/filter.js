// Filter.js
import React, { useEffect } from 'react';
import Switch from '../../common/switch';

const Filter = ({ filters, filterOptions, toggleFilters }) => {
  const onSwitch = (filter, isChecked) => {
    filters({
      ...filterOptions,
      [filter]: isChecked,
    });
  };

  useEffect(() => {
    filters(filterOptions);
  }, [filterOptions, filters]);

  return (
    <div>
      <div className='filter-options' id="filterOptions">
        {Object.entries(filterOptions).map(([filter, isOn]) => (
          <label className='filter-label' key={filter}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}:{' '}
            <Switch filter={filter} isOn={isOn} onSwitch={(isChecked) => onSwitch(filter, isChecked)} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;


const filterStyles = `
{

}
`
