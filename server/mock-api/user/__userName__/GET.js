module.exports = (request, response) => {
  if (request.params.userName === 'custom') {
    return response.status(409).send({});
  }

  setTimeout(() => {
    response.json({
      user: {
        id: 0,
        userName: request.params.userName,
        age: 20,
      },
    });
  }, 2000);
};
