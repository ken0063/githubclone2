export const handleApiErrors = (error) => {
    const message = error?.message ?? '';
  
    if (error.response) {
      if (error.response.data) {
        return error.response.data;
      }
    }
  
    return message;
  };



  export const handleResponseError = (response) => {
    if (!response) {
      return 'There was an error';
    }
  
    if (!response.success && response.message) {
      return response.message;
    }
  
    if (response.errors || response.error) {
      let message = '';
      response.errors.filter((v) => (message += v.message));
      return message;
    }
  };