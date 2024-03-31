// Role validation
function validateRole(role) {
  const result = {
    name: 'role',
    ok: false,
    message: '',
    value: null
  };

  const allowedRoles = ['dj', 'requester', 'admin'];

  if (!role) {
    result.ok = false;
    result.message = 'Role cannot be empty.';
  } else if (!allowedRoles.includes(role)) {
    result.ok = false;
    result.message = 'Invalid role. Allowed roles are: dj, requester, admin.';
  } else {
    result.ok = true;
    result.value = role;
  }

  return result;
}

module.exports = { validateRole };
