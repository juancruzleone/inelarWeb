import express from "express";
import ApiProductsRoutes from '../api/routes/route.api.products.js';
import ApiClientsRoutes from '../api/routes/route.api.clients.js';
import ApiContactRoutes from '../api/routes/route.api.contacts.js';
import ApiServicesRoutes from '../api/routes/route.api.services.js';
import ApiCheckoutRoutes from '../api/routes/route.api.checkout.js';
import ApiOrdersRoutes from '../api/routes/route.api.order.js';
import ApiProfileRoutes from '../api/routes/route.api.profile.js'
import ApiAuthRoutes from '../api/routes/route.api.auth.js';
import cors from 'cors';

const app = express(); 

app.use(express.urlencoded({ extended: true })); 
app.use("/", express.static("public"));
app.use(express.json());                        
app.use(cors());


app.use('/api', ApiProductsRoutes);
app.use('/api', ApiClientsRoutes);
app.use("/api", ApiContactRoutes);
app.use("/api", ApiServicesRoutes);
app.use("/api", ApiCheckoutRoutes);
app.use('/api', ApiOrdersRoutes);
app.use('/api', ApiProfileRoutes);
app.use('/api', ApiAuthRoutes);

app.listen(2023);
