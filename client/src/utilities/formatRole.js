// File: formatRole.js
// Description: converts integers to role strings

export function formatRole(role) {
  switch (role) {
    case 0:
      return "Unverified User";
    case 1:
      return "External User";
    case 2:
      return "Internal User";
    case 3:
      return "External Editor";
    case 4:
      return "Internal Editor";
    case 5:
      return "Administrator";
    default:
      return "";
  }
}