const START_LOADING = 'redux-shopping-mall/loading/START_LOADING';
const FINISH_LOADING = 'redux-shopping-mall/loading/FINISH_LOADING';

export default function loading(state = false, action) {
  switch (action.type) {
    case START_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return state;
  }
}

export const startLoading = () => ({
  type: START_LOADING,
});

export const finishLoading = () => ({
  type: FINISH_LOADING,
});
