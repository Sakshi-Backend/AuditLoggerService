export class LogDiff{
    /**
 * @key key of the data
 * @oldData old row data
 * @newData new row data
 */
public static doesKeyValueMatchInData(key, oldData, newData){
  if (oldData.hasOwnProperty(key)) {
    if (oldData[key] === newData[key] || key==='updatedAt') {  //not storing the updatedAt as difference
      return true;
    }
    // key is available but value has changed
    return false;
  } 
  // key is not available
  return false;
  };

  public static calculateDiff(oldData, newData){
      // if oldData is {} i.e. row is newly created
      if (Object.keys(oldData).length === 0) {
         let {_id,...result}=newData
          return result;
        }
        const log = {};
        //newly changed data
        Object.keys(newData).forEach((key) => {
          if (!this.doesKeyValueMatchInData(key, oldData, newData)) {
            log[key] = newData[key];
          }
        });
        return log;
      }
}