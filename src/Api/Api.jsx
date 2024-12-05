export const BASE_URL = `http://localhost:5173/api`;

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
  /* ======= Videos ======= */
  addVideo: `${BASE_URL}/videos`,
  addVideo: `${BASE_URL}/videos/sub`, // get videos of people u follow
  searchVideo: `${BASE_URL}/videos/search`, //   params : q
  getTrendVideos: `${BASE_URL}/videos/trend`,
  getRandomVideos: `${BASE_URL}/videos/random`,
  getVideosByTags: `${BASE_URL}/videos/tags`, // params : tags as a string
  viewVideo: `${BASE_URL}/videos/viewMoudel`, //   /:videoId
  updateVideo: `${BASE_URL}/videos`, //   /:videoId
  deleteVideo: `${BASE_URL}/videos`, //   /:videoId
  copyUrlForVideo: (idVideo) => `${BASE_URL}/videos/${idVideo}/copyUrl`,
  /* ======= Users ======= */
  getUserById: `${BASE_URL}/users/find`, //   /:userId
  subscribe: `${BASE_URL}/users/sub`, //   /:idUser
  unsubscribe: `${BASE_URL}/users/unsub`, //   /:idUser
  likeVideo: `${BASE_URL}/users/like`, //   /:videoId
  dislikeVideo: `${BASE_URL}/users/dislike`, //   /:videoId
  deleteUser: `${BASE_URL}/users`, //   /:userId
  updateUser: `${BASE_URL}/users`, // body params
  /* ======= Communities ======= */
  addCommunity: `${BASE_URL}/communities/create`,
  inviteToCommunity: `${BASE_URL}/communities/invite`,
  acceptInvitation: `${BASE_URL}/communities/accept-invitation`,
  /* ======= Notifications ======= */
  showNotifications: `${BASE_URL}/notification`, //     /:idUser
  /* ======= Balance ======= */
  getBalance: `${BASE_URL}/balances/get-balance`,
  deductBalance: `${BASE_URL}/balances/deduct-coins`,
  bonusBalance: `${BASE_URL}/balances/bonus-coins`,
  /* ======= ChatGPT ======= */
  sendMasgageToChatGPT: `${BASE_URL}/chatRoutes/chatBot`,
  /* ======= Owners ======= */
  /* ======= Premium ======= */
  /* ======= Test 222 ======= */
};
