import domo from './domo';
import { COLLECTION } from '../components/constant';

const appdb = () => {};
export default appdb;

appdb.postDocument = async (document) => {
  const resp = await domo.post(COLLECTION.DOCUMENTS, document);
  console.log('postDoc', resp);
  return resp;
};

appdb.getDocuments = async () => {
  const resp = await domo.get(COLLECTION.DOCUMENTS);
  console.log('appdb getDocs', resp);
  return resp;
};

appdb.updateDocument = async (document, documentId) => {
  const url = COLLECTION.DOCUMENTS + documentId;
  console.log('update doc', url);
  const resp = await domo.put(url, document);
  console.log('appdb updateDocs', resp);
  return resp;
};

appdb.deleteDocument = async () => {
  console.log('delete all');
  const allDocs = await appdb.getDocuments();
  const idList = allDocs.map((doc) => doc.id);
  const url = `${COLLECTION.DOCUMENTS}bulk?ids=${idList.join()}`;
  const resp = await domo.delete(url);
  console.log(resp);
  return resp;
};
