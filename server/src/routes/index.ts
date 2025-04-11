import {Router} from 'express';

import {ipRoute} from './ip.route';
import domainsRoute from './domains.route';

const apiRouter = Router();

apiRouter.use('/ip', ipRoute);
apiRouter.use('/domains', domainsRoute);

export default apiRouter;