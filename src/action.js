function createAction(type) {
  function actionCreator(payload, meta) {
    return { type, payload, meta };
  }
  actionCreator.toString = function() {
    return '' + type;
  };
  actionCreator.type = type;
  return actionCreator;
}

const selectAction = createAction('SELECT');
export { selectAction };
