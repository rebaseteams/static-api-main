import * as express from 'express';
import getArtists from './repos/artist';

const router = express.Router();

router.get('/recommendations/:id', (req, res) => {
  if (req.params.id === '123') {
    res.send(getArtists());
  } else {
    res.send([]);
  }
});

export default router;
