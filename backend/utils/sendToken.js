/*let us create a function that will assign the token and then save that token in the cookie , 
Now ,if we dont know , we can make an http only cookie , now http only cookie can only be acccessed
from the server side , cannot be accessed on the client side (  httpOnly: true ), so you can say that it is a safe place to 
put our token , Because definitely we have to save the token somewhere so that we can check before each request 
 that the user is authenticated or not . for that we have to save the token and best place to save the token is 
 goging to be http only cookie because that cannot be acessed from the front-end , it can only be accessed on the backend

*/
// Create token and save in the cookie
export default (user, statusCode, res) => {
  // Create JWT Token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
