import localForage from 'localforage';

/**
 * i fake Db using locaforage who use localstorage with async call$
 *  to check DB open devTool > Application > IndexedDB > Database > keyvaluepairs
 */
const db = localForage.createInstance({
  name: 'Database',
});
export default db;
