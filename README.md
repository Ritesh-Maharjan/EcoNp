# ecommerce

> This is a simple ecommerce projects where admin can create, update and delete the products. The users i.e. buyer can add the item into the cart and purchase the item. They can also leave and update the reviews. Both admin and user can update and delete their profile.

<hr>

Giving admin login info since admin can not be created. Please use the below username and password to login to the app

# Login details

**Admin login details**

Email: riteshmaharjan07@gmail.com 

Password: password


# Functionality of the project

* Admin can create, update and delete products.
* Both admin and users can update their profile email and password.
* Users can forget their password where a reset link email is sent to the user by using nodemailer package.
* Used cloudinary API to upload and remove images in the products.
* Users can add/remove multiple items to the cart and increase/decrease the quantity.
* Users can post, update and delete reviews of the product.
* There are routes that are protected where user has to be logged in and also forbidden routes where only admin can access the page
* User can checkout and pay for the product with the help of Stripe API.
* User can search for the product using the search features and also filter the items by categories.
* Categories are added dynamically so fliter options are changed dynamically when admin create new products with different categories.
* Input validation on frontend using Formik and Yup.
* Both admin and user can delete their account.
* Deleting the user account removes all the reviews left by that particular user.

# Struggles when creating this project

* Had bug when creating cart functionality as adding the first cart moved its position to last place if their was multiple items. I was using filter functions to change the cart items and due to that the item was being readded in the end. Instead of using filter, used findIndex to find the position of the item and updated the item accordingly.
* Had problems with displaying cart as I was using fixed css. When adding multiple items there was no scroll. It was due to not adding bottom 0 as i was only using top and right.
* Sending multiple images with the cloudAPI was a problem due to using forEach. Changed it into map function and realized not all the Promises were being actioned so had to use Promise.all to resolve this problem.
* Was having issue with logic doing the reset password.
