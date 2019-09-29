import express from 'express';

import { join } from 'path';

import { clientAssets } from 'server/middleware/clientAssets';
import { prepareState } from 'server/middleware/prepareState';
import { renderPage } from 'server/middleware/renderPage';
import { photoApi, photosApi } from 'server/middleware/standaloneApi';
import { errorHandler } from 'server/middleware/errorHandler';
import { routeApi } from 'server/middleware/routeApi';

const app = express();

app.use(express.static(join(__dirname, 'client')));

// Standalone API
app.get('/api/photos', photosApi());
app.get('/api/photo/:id', photoApi());

// Universal route API
app.get('/api/route', routeApi());

// Normal page rendering process
app.use(prepareState());
app.use(clientAssets());
app.use(renderPage());

// Handle all errors
app.use(errorHandler());

app.listen(process.env.PORT || 3000);
