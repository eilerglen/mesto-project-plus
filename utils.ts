import { Request } from 'express';

interface TempRequest extends Request {
  user?: {_id: string } ;
}

export default TempRequest;

// {
//   "name": "Baikal",
//   "link": "https://russia.travel/upload/resize/854291/1280_1280/1904457.jpg",
//   "owner": "62eec612b321bf743bc52aca"
// }


// {
//   "name": "Тестовый",
//   "about" : "Самый лучший",
//   "avatar" : "https://vraki.net/sites/default/files/inline/images/1_149.jpg"

// }
