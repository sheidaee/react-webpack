module.exports = (request, response) => {
  // const { email, password } = request.body;

  setTimeout(() => {
    try {
      return response.status(201).send({
        token: 1134,
        email: request.body.email,
        nickname: 'nick',
      });
    } catch (error) {
      return response.status(400).send({ message: error.message, status: 0 });
    }
  }, 2000);
};
