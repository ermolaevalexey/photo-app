
const { VK } = window;

export function authController() {

  return VK.Auth.login((response) => {

    if (response.session) return response.session.user;

    return {
      message: new Error("Auth error")
    };

  });

}
