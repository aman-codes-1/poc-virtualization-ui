export const column = [
  {
    field: "name",
    label: "Name",
    align: "center",
  },
  {
    field: "email",
    label: "Email Address",
    format: (value) => value && value.toUpperCase(),
  },
  {
    field: "phone",
    label: "Contact",
  },
  {
    field: "city",
    label: "City",
  },
  {
    field: "geolocation",
    label: "Geolocation",
  },
  {
    field: "website",
    label: "Website",
  },
  {
    field: "actions",
    label: "Actions",
    align: "center",
  },
];

export const noData = "OOPS!, No More Users";
