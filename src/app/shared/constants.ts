export const FORM_TYPE = {
   CUSTOMER : "customer",
   PIN : "pin"
}

export const customerHeaders = [
    { label: 'Name', key: 'name', type: 'text' },
    { label: 'Email', key: 'email', type: 'text' },
    { label: 'Region', key: 'region', type: 'text' },
    { label: 'Country', key: 'country', type: 'text' },
  ];

  export const pinHeaders = [
    { label: 'Title', key: 'title', type: 'text' },
    { label: 'Image', key: 'document', type: 'image' },
    { label: 'Collaboratory', key: 'collaborators', type: 'text' },
    { label: 'Privacy', key: 'privacy', type: 'text' },
  ];