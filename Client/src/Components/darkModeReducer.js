
//switch statement is used to determine the appropriate state update
const DarkModeReducer = (state, action) => {
    switch (action.type) {
      case "LIGHT": {
        return {
          darkMode: false,
        };
      }
      case "DARK": {
        return {
          darkMode: true,
        };
      }
      // allows toggling between light and dark mode.
      case "TOGGLE": {
        return {
          darkMode: !state.darkMode,
        };
      }
      default:
        return state;
    }
  };
  
  export default DarkModeReducer;