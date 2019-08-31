function createAction(type) {
  function actionCreator(payload, meta) {
    return { type, ...(payload && { payload }), ...(meta && { meta }) };
  }
  actionCreator.toString = function() {
    return '' + type;
  };
  actionCreator.type = type;
  return actionCreator;
}

export const selectSource = createAction('SELECT_SOURCE');
export const selectTarget = createAction('SELECT_TARGET');
export const selectDirection = createAction('SELECT_DIRECTION');

export const performMove = createAction('PERFORM_MOVE');
