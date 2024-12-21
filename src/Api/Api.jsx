export const BASE_URL = `http://localhost:5173/api`;

export const API = {
  /* ======= Authentication ======= */
  signup: `${BASE_URL}/auth/signup`,
  signin: `${BASE_URL}/auth/signin`,
  /* ======= Posts ======= */
  addPost: `${BASE_URL}/routPost`,
  deletePost: `${BASE_URL}/routPost`, //     /:idPost
  getAllPosts: `${BASE_URL}/routPost/random`, //     /:idUser
  getPostsUser: `${BASE_URL}/routPost/find`, //     /:idUser
  updatePost: `${BASE_URL}/routPost`, //     /:idPost
  likePost: (idPost) => `${BASE_URL}/routPost/${idPost}/like`,
  dislikePost: (idPost) => `${BASE_URL}/routPost/${idPost}/dislike`,
  copyUrlForPost: (idPost) => `${BASE_URL}/routPost/${idPost}/copyUrl`,
  savePost: `${BASE_URL}/routPost/savePost`, //     /:idPost
  unsavePost: `${BASE_URL}/routPost/unsavePost`, //     /:idPost
  /* ======= Masseges ======= */
  SendMassege: `${BASE_URL}/messages`, // Post
  getMasseges: `${BASE_URL}/messages`,
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
  getVideosForSpecificUser: `${BASE_URL}/videos/find`, // /:userId
  viewVideo: `${BASE_URL}/videos/viewMoudel`, //   /:videoId
  updateVideo: `${BASE_URL}/videos`, //   /:videoId
  deleteVideo: `${BASE_URL}/videos`, //   /:videoId
  copyUrlForVideo: (idVideo) => `${BASE_URL}/videos/${idVideo}/copyUrl`,
  /* ======= Users ======= */
  getAllUsers: `${BASE_URL}/users/getAllUsers`,
  getUserById: `${BASE_URL}/users/find`, //     /:userID

  subscribe: `${BASE_URL}/users/sub`, //   /:userID
  unsubscribe: `${BASE_URL}/users/unsub`, //   /:userID

  AddFriend: `${BASE_URL}/users/send-request`, //     /:FriendID
  AcceptFriend: `${BASE_URL}/users/accept-request`, //     /:FriendID
   // in Body : {"receiverId":"6761843c3aa8c81ef60868ee"}
   
  updateUser: `${BASE_URL}/users`, // :userId
  // in Body : values For Update User

  deleteUser: `${BASE_URL}/users`, //   /:userId
  likeVideo: `${BASE_URL}/users/like`, //   /:videoId
  dislikeVideo: `${BASE_URL}/users/dislike`, //   /:videoId
  /* ======= Communities ======= */
  createCommunity: `${BASE_URL}/communities/create`,
  getCommunityById: `${BASE_URL}/communities/community`, // /:idCommunity
  inviteToCommunity: `${BASE_URL}/communities/invite`,
  acceptInvitation: `${BASE_URL}/communities/accept-invitation`,
  leaveCommunity: `${BASE_URL}/communities/exit-community/`, // /:idCommunity
  deleteCommunity: `${BASE_URL}/communities/delete-community/`, // /:idCommunity
  /* ======= Notifications ======= */
  showNotifications: `${BASE_URL}/notifications`, //     /:idUser
  newNotifications: `${BASE_URL}/notifications//New`, //     /:idUser
  /* ======= Balance ======= */
  getBalance: `${BASE_URL}/balances/get-balance`,
  deductBalance: `${BASE_URL}/balances/deduct-coins`,
  bonusBalance: `${BASE_URL}/balances/bonus-coins`,
  /* ======= ChatGPT ======= */
  sendMasgageToChatGPT: `${BASE_URL}/chatRoutes/chatBot`,
  /* ======= Owners ======= */
  /* ======= Premium ======= */
  subscribePlan: `${BASE_URL}/premium-plans/subscribe`,
  getUserPlanById: `${BASE_URL}/premium-plans/PlanType`, //     /:idUser
  /* ======= Test 222 ======= */
};
