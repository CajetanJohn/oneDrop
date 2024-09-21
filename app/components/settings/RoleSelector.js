import React from 'react';

const roles = ['dj', 'audience', 'host'];

const RoleSelector = ({ role, onRoleChange }) => {
  return (
    <div className="role-selector">
      <label>Role:</label>
      <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelector;
