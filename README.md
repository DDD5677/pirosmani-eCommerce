# Pirosmani-eCommerce [:link:](https://pirosmani1.netlify.app)
This eCommerce allows restaurants to manage online sales.
### Features ✨

- All types of meals are divided into categories. That's why, it easy for customers to find the food they want.
- Customers can leave comments on the products. But their comment will be visible on the site only if the owner or admin accept it. Rejected comments will not be visible on the site.
- Customers can also book a place at the restaurant in advance.
- There are two types of delivery. These are through the delivery service and self-delivery.The buyer can choose the one he wants.
- There are profile page of customers, they can track their informations and  purchase history.
- In addition, there is admin panel for owner of restaurant to manage eCommerce.
- In admin panel allows owner to manage all products, orders, reviews, table reservations, advertising banners and site informations.

# Setup Project
1. Clone repository
```
git clone git@github.com:DDD5677/pirosmani-eCommerce.git
```
### Backend
2. Install all dependencies for backend.
```
cd backend
npm install
```
3. Create an empty ` .env` file in `/backend`, copy the following contents into it and fill in these variables:

```
API_URL=/api/v1
BASE_URL='http://localhost:3000'
PORT=3000
ACCESS_SECRET=secret_for_access_token
REFRESH_SECRET=secret_for_refresh_token
CONNECTING_STRING = mongodb_atlas_url
```
4. Run project in developer mode.
```
npm install -D nodemon
npm run dev
```
5. Run project in production mode.
```
npm start
```
### Frontend
6. Install all dependencies for frontend.
```
cd frontend
npm install
```
8. Run project in dev mode.
```
npm run serve
```
9. Build project.
```
npm run build
```
### Admin Panel
9. Install all dependencies for admin.
```
cd admin
npm install
```
11. Run project in dev mode.
```
npm run serve
```
12. Build project.
```
npm run build
```
