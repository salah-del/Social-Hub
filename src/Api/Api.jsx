export const BASE_URL = `http://localhost:8800/api`;

export const API = {
  /* ======= Authentication ======= */
  signup: `${BASE_URL}/auth/signup`,
  signin: `${BASE_URL}/auth/signin`,
  /* ======= Posts ======= */
  addPost: `${BASE_URL}/routPost`,
  deletePost: `${BASE_URL}/routPost`, //     /:idPost
  getPosts: `${BASE_URL}/routPost/random`, //     /:idUser
  updatePost: `${BASE_URL}/routPost`, //     /:idPost
  likePost: (idPost) => `${BASE_URL}/routPost/${idPost}/like`,
  dislikePost: (idPost) => `${BASE_URL}/routPost/${idPost}/dislike`,
  copyUrlForPost: (idPost) => `${BASE_URL}/routPost/${idPost}/copyUrl`,
  savePost: `${BASE_URL}/routPost/savePost`, //     /:idPost
  unsavePost: `${BASE_URL}/routPost/unsavePost`, //     /:idPost
  /* ======= Comments ======= */
  addComment: `${BASE_URL}/comments`,
  replyComment: `${BASE_URL}/comments`,
  getComments: `${BASE_URL}/comments`, //     /:idPost
  deleteComment: `${BASE_URL}/comments`, //     /:idComment
  /* ======= Notifications ======= */
  showNotifications: `${BASE_URL}/notification`, //     /:idUser
  /* ======= Communities ======= */
  addCommunity: `${BASE_URL}/communities/create`,
  inviteToCommunity: `${BASE_URL}/communities/invite`,
  acceptInvitation: `${BASE_URL}/communities/accept-invitation`,
};
